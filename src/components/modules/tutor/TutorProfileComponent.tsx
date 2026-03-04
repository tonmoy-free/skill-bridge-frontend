"use client";

import { createSubject } from "@/actions/subject.action";
import { createTutorProfile, updateTutorProfileById } from "@/actions/tutor.action";
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
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import z from "zod";

const formSchema = z.object({
    bio: z.string().min(1, "Bio is required"),
    hourlyFee: z.number().min(1, "Hourly Fee is required"),
    monthlyFee: z.number().min(1, "Monthly Fee is required"),
    experience: z.number().min(1, "Experience is required"),
});

// Extract type from schema for the form
type TutorFormValues = z.infer<typeof formSchema>;

export interface TutorProfileData {
    bio: string;
    hourlyFee: number;
    monthlyFee: number;
    experience: number;
    id: string;
    rating: number;
    createdAt: string;
    updatedAt: string;

}

export default function TutorProfileComponent({ initialData }: { initialData: TutorProfileData }) {
    console.log("Initial data received in component:", initialData);
    const form = useForm({
        defaultValues: {
            bio: initialData?.bio || "",
            hourlyFee: initialData?.hourlyFee || 0, // Changed to number
            monthlyFee: initialData?.monthlyFee || 0, // Changed to number
            experience: initialData?.experience || 0, // Changed to number
        } as TutorFormValues,
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            // Simplified validation check (Zod handles most of this now)
            if (!value.bio.trim() || value.hourlyFee <= 0 || value.monthlyFee <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please provide valid information!",
                });
                return;
            }
            console.log(value)
            const toastId = toast.loading("Creating Profile");
            try {
                // Example call assuming you have the userId from elsewhere (e.g., props or auth hook)
                const res = await updateTutorProfileById(value, 0);

                if (!res.data || res.error) {
                    toast.error("Internal server error", { id: toastId });
                    return;
                }

                toast.success("Profile created successfully", { id: toastId });
                form.reset();
            } catch (err) {
                toast.error("Internal server error", { id: toastId });
            }
        }
    })

    return (
        <div>
            <Card className="md:w-6/12 w-full mx-auto">
                <CardHeader>
                        <CardTitle>Update Tutor Profile</CardTitle>
                        <CardDescription>
                            You can update your profile
                        </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="create-subject-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}>
                        <FieldGroup>
                            {/* BIO FIELD */}
                            <form.Field name="bio" children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                                    <Input
                                        placeholder="Type your bio"
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )} />

                            {/* HOURLY FEE FIELD */}
                            <form.Field name="hourlyFee" children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Hourly Fee</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        id={field.name}
                                        value={field.state.value}
                                        // Conversion: String to Number
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )} />

                            {/* MONTHLY FEE FIELD */}
                            <form.Field name="monthlyFee" children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Monthly Fee</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        id={field.name}
                                        value={field.state.value}
                                        // Conversion: String to Number
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )} />

                            {/* EXPERIENCE FIELD */}
                            <form.Field name="experience" children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Experience (Years)</FieldLabel>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        id={field.name}
                                        value={field.state.value}
                                        // Conversion: String to Number
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )} />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end flex-col gap-5">  
                    <Button form="create-subject-form" type="submit" className="w-full">
                        Update Profile
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}