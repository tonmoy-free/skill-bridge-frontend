// "use client";

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import { useForm } from "@tanstack/react-form";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import z from "zod";

// const formSchema = z.object({
//   password: z.string().min(8, "MInimum Length is 8"),
//   email: z.email(),
// })


// export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
//   const router = useRouter()
//   const handleGoogleLogin = async () => {
//     const data = authClient.signIn.social({
//       provider: "google",
//       callbackURL: "http://localhost:3000/"
//     });

//     console.log(data);
//   };

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     validators: {
//       onSubmit: formSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Logging in");
//       try {
//         const { data, error } = await authClient.signIn.email(value);

//         if (error) {
//           toast.error(error.message, { id: toastId })
//           return;
//         }

//         toast.success("User Logged in successfully", { id: toastId });
//         router.push("/");
//         router.refresh();
//       } catch (err) {
//         toast.error("Internal server error", { id: toastId });
//       }
//     }
//   })

//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//         <CardDescription>
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form
//           id="login-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}>
//           <FieldGroup>
//             <form.Field name="email" children={(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (<Field>
//                 <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                 <Input
//                   type="email"
//                   id={field.name}
//                   name={field.name}
//                   value={field.state.value}
//                   onChange={(e) => field.handleChange(e.target.value)} />

//                 {isInvalid && (
//                   <FieldError errors={field.state.meta.errors} />
//                 )}
//               </Field>)
//             }} />

//             <form.Field name="password" children={(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (<Field data-invalid={isInvalid}>
//                 <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                 <Input
//                   type="password"
//                   id={field.name}
//                   name={field.name}
//                   value={field.state.value}
//                   onChange={(e) => field.handleChange(e.target.value)} />

//                 {isInvalid && (
//                   <FieldError errors={field.state.meta.errors} />
//                 )}
//               </Field>)
//             }} />
//           </FieldGroup>

//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-end flex-col gap-5">
//         <Button form="login-form" type="submit" className="w-full">Login</Button>
//         <Button
//           onClick={() => handleGoogleLogin()}
//           variant="outline" type="button" className="w-full">
//           Login with Google
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }


"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Minimum Length is 8"),
  email: z.string().email("Invalid email address"),
})

// Props হিসেবে callbackUrl গ্রহণ করা হচ্ছে
interface LoginFormProps extends React.ComponentProps<typeof Card> {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl, ...props }: LoginFormProps) {
  const router = useRouter();
  
  // ডিফল্ট রিডাইরেক্ট পাথ সেট করা (যদি callbackUrl না থাকে)
  const targetPath = callbackUrl || "/";
console.log(callbackUrl)
  // গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `http://localhost:3000/${targetPath}` // সফল লগইন এর পর এখানে পাঠাবে
    });
  };

  // ইমেইল লগইন হ্যান্ডলার
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          // Better Auth এ সরাসরি callbackURL প্রপার্টি থাকলে এখানেও দিতে পারেন
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in successfully", { id: toastId });
        
        // ম্যানুয়ালি রিডাইরেক্ট করা
        router.push(targetPath);
        router.refresh();
      } catch (err) {
        toast.error("Internal server error", { id: toastId });
      }
    }
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    placeholder="m@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />

            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end flex-col gap-3">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        <div className="relative w-full py-2">
           <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
           <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
