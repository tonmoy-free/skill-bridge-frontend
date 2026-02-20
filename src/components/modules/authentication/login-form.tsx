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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "MInimum Length is 8"),
  email: z.email(),
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/"
    });

    console.log(data);
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId })
          return;
        }

        toast.success("User Logged in successfully", { id: toastId });
      } catch (err) {
        toast.error("Internal server error", { id: toastId });
      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (<Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)} />

                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>)
            }} />

            <form.Field name="password" children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (<Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)} />

                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>)
            }} />
          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter className="flex justify-end flex-col gap-5">
        <Button form="login-form" type="submit" className="w-full">Login</Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline" type="button" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
