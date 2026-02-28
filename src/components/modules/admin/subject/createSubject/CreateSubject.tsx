"use client";

import { createSubject } from "@/actions/subject.action";
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
import Swal from "sweetalert2";
import z from "zod";

const formSchema = z.object({
    subject: z.string().min(1, "Subject name is required"), // পরিবর্তন এখানে
});


export default function CreateSubject() {
    const form = useForm({
        defaultValues: {
            subject: "", // পরিবর্তন এখানে
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {

            if (!value.subject || !value.subject.trim()) {
                console.log("empty")
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Subject name can't be empty!",
                });
                return;
            }
            const toastId = toast.loading("Creating Subject");
            try {
                // এখানে API কল করুন Subject তৈরি করার জন্য

                const res = await createSubject({ name: value.subject }, 5);

                if (!res.data || res.error) {
                    toast.error("Internal server error", { id: toastId });
                    return;
                }

                // console.log({ name: value.subject });
                toast.success("Subject created successfully", { id: toastId });
                form.reset();
            } catch (err) {
                toast.error("Internal server error", { id: toastId });
            }
        }
    })
    return (
        <div>
            <Card className="md:w-4/12 w-full mx-auto">
                <CardHeader>
                    <CardTitle>Create an Subject</CardTitle>
                    <CardDescription>
                        Enter your information below to create your Subject
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
                            <form.Field name="subject" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (<Field>
                                    <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                                    <Input
                                        type="text"
                                        placeholder="Type subject name"
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
                    <Button form="create-subject-form" type="submit" className="w-full">Create Subject</Button>
                </CardFooter>
            </Card>
        </div >
    );
}