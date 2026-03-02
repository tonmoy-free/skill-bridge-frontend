"use client";

import { getAllTutor } from "@/actions/assignTutor.action";
import { createCategory } from "@/actions/category.action";
import { getAllClass } from "@/actions/class.action";
import { finalGetAllCategory } from "@/actions/finalCategory.action";
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
    tutorId: z.string().min(1, "Please select a tutor"),
    categoryId: z.string().min(1, "Please select a category"),
});

export default function AssignTutorCategoryComponent() {
    const [loading, setLoading] = useState(false);
    const [tutorData, setTutorData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [tutorRes, categoryRes] = await Promise.all([
                    getAllTutor(),
                    finalGetAllCategory()
                ]);
                
                if (tutorRes.data) setTutorData(tutorRes.data);
                if (categoryRes.data) setCategoryData(categoryRes.data);
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
            tutorId: "",
            categoryId: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Category...");
            try {
                // const res = await createCategory({ 
                //     tutorId: value.tutorId,
                //     categoryId: value.categoryId,
                // }, 5);
                // console.log("Create Category Response:", res);

                // if (res.error) throw new Error(res.error.message);

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
                    <CardTitle>Assign Tutor Category</CardTitle>
                    <CardDescription>Select tutor and category relations</CardDescription>
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
                        {/* ১. Tutor Dropdown */}
                        <form.Field name="tutorId" children={(field) => (
                            <Field>
                                <FieldLabel>Select Tutor</FieldLabel>
                                <Select onValueChange={field.handleChange} value={field.state.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={loading ? "Loading tutors..." : "Select a tutor"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tutorData.map((tutor) => (
                                            <SelectItem key={tutor.id} value={tutor.id}>{tutor.user.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {field.state.meta.errors && <FieldError>{field.state.meta.errors.join(", ")}</FieldError>}
                            </Field>
                        )} />

                        {/* ২. Subject Dropdown (Parent Subject) */}
                        <form.Field name="categoryId" children={(field) => (
                            <Field>
                                <FieldLabel>Category</FieldLabel>
                                <Select onValueChange={field.handleChange} value={field.state.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select tutor category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryData.map((sub) => (
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

