"use client";

import { createCategory } from "@/actions/category.action";
import { getAllClass } from "@/actions/class.action";
import { createSubject, getAllSubject } from "@/actions/subject.action";
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
    FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import z from "zod";


// ১. ভ্যালিডেশন স্কিমা আপডেট
const formSchema = z.object({
    classId: z.string().min(1, "Please select a class"),
    subjectId: z.string().min(1, "Subject name is required"),
});

export default function CreateCategoryComponent() {
    const [loading, setLoading] = useState(false);
    const [classesData, setClassesData] = useState<any[]>([]);
    const [subjectData, setSubjectData] = useState<any[]>([]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [classRes, subjectRes] = await Promise.all([
                    getAllClass(),
                    getAllSubject()
                ]);
                
                if (classRes.data) setClassesData(classRes.data);
                if (subjectRes.data) setSubjectData(subjectRes.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const form = useForm({
        defaultValues: {
            classId: "",
            subjectId: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Category...");
            try {
                const res = await createCategory({ 
                    classId: value.classId,
                    subjectId: value.subjectId,
                }, 5);
                console.log("Create Category Response:", res);

                if (res.error) throw new Error(res.error.message);

                toast.success("Category created successfully", { id: toastId });
                form.reset();
            } catch (err: any) {
                toast.error(err.message || "Failed to create", { id: toastId });
            }
        }
    });

    return (
        <div>
            <Card className="md:w-5/12 w-full mx-auto">
                <CardHeader>
                    <CardTitle>Create Subject Configuration</CardTitle>
                    <CardDescription>Select class and subject relations</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="create-category-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-4"
                    >
                        {/* ১. Class Dropdown */}
                        <form.Field name="classId" children={(field) => (
                            <Field>
                                <FieldLabel>Select Class</FieldLabel>
                                <Select onValueChange={field.handleChange} value={field.state.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={loading ? "Loading classes..." : "Select a class"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classesData.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {field.state.meta.errors && <FieldError>{field.state.meta.errors.join(", ")}</FieldError>}
                            </Field>
                        )} />

                        {/* ২. Subject Dropdown (Parent Subject) */}
                        <form.Field name="subjectId" children={(field) => (
                            <Field>
                                <FieldLabel>Parent Subject (Optional)</FieldLabel>
                                <Select onValueChange={field.handleChange} value={field.state.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select parent subject (if any)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjectData.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )} />

                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="create-category-form" type="submit" className="w-full" disabled={loading}>
                        {loading ? "Processing..." : "Create Category"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}