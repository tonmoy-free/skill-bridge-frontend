"use client";

import { createSubject, updateSubjectById } from "@/actions/subject.action";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import z from "zod";

const formSchema = z.object({
    subject: z.string().min(1, "Subject name is required"),
});

// ✅ এটি এখন একটি সাধারণ ফাংশন, async নয়
export default function SingleSubjectComponent({ initialData }: { initialData: any }) {
    console.log("Initial data received in component:", initialData);
    const form = useForm({
        defaultValues: {
            subject: initialData?.name || "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            if (!value.subject.trim()) {
                Swal.fire({ icon: "error", title: "Oops...", text: "Subject name can't be empty!" });
                return;
            }

            const toastId = toast.loading("Updating Subject...");
            try {
                const res = await updateSubjectById(initialData.id, { name: value.subject }, 5);
                if (res.error) throw new Error(res.error.message);

                toast.success("Subject updated successfully", { id: toastId });
            } catch (err: any) {
                toast.error(err.message || "Internal server error", { id: toastId });
            }
        }
    });

    return (
        <div>
            <Card className="md:w-4/12 w-full mx-auto">
                <CardHeader>
                    <CardTitle>Update Subject</CardTitle>
                    <CardDescription>Edit the subject information below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="update-subject-form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                        <FieldGroup>
                            <form.Field name="subject" children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Subject Name</FieldLabel>
                                    <Input
                                        type="text"
                                        placeholder="Type subject name"
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                                    )}
                                </Field>
                            )} />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="update-subject-form" type="submit" className="w-full">Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}