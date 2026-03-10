// "use client";

// import { createSubject } from "@/actions/subject.action";
// import { createTutorProfile, updateTutorProfileById } from "@/actions/tutor.action";
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     Field,
//     FieldGroup,
//     FieldLabel,
//     FieldError,
// } from "@/components/ui/field";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { useForm } from "@tanstack/react-form";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Swal from "sweetalert2";
// import z from "zod";

// const formSchema = z.object({
//     bio: z.string().min(1, "Bio is required"),
//     hourlyFee: z.number().min(1, "Hourly Fee is required"),
//     monthlyFee: z.number().min(1, "Monthly Fee is required"),
//     experience: z.number().min(1, "Experience is required"),
//     categoryId: z.string().min(1, "Category name is required"),
// });

// // Extract type from schema for the form
// type TutorFormValues = z.infer<typeof formSchema>;

// export interface TutorProfileData {
//     bio: string;
//     hourlyFee: number;
//     monthlyFee: number;
//     experience: number;
//     id: string;
//     rating: number;
//     createdAt: string;
//     updatedAt: string;
// }

// interface TutorProfileComponentProps {
//     initialData: any; // Or your specific TutorProfileData type
//     allCategory: any[];
// }

// // export default function TutorProfileComponent({ initialData }: { initialData: TutorProfileData }) {
// export default function TutorProfileComponent({ initialData, allCategory }: TutorProfileComponentProps) {
//     console.log("Initial data received in component:", initialData);
//     console.log("allCategory received in component:", allCategory);

//     const [loading, setLoading] = useState(false);
//     const [categoryData, setCategoryData] = useState<any[]>([]);

//     useEffect(() => {
//             const loadInitialData = async () => {
//                 try {
//                     setLoading(true);
//                     // const [classRes, subjectRes] = await Promise.all([
//                     //     getAllClass(),
//                     //     getAllSubject()
//                     // ]);
//                     const categoryRes = allCategory;

//                     if (categoryRes) setCategoryData(categoryRes);
//                 } catch (err) {
//                     console.error("Fetch error:", err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             loadInitialData();
//         }, []);

//     const form = useForm({
//         defaultValues: {
//             bio: initialData?.bio || "",
//             hourlyFee: initialData?.hourlyFee || 0, // Changed to number
//             monthlyFee: initialData?.monthlyFee || 0, // Changed to number
//             experience: initialData?.experience || 0, // Changed to number
//         } as TutorFormValues,
//         validators: {
//             onSubmit: formSchema,
//         },
//         onSubmit: async ({ value }) => {
//             // Simplified validation check (Zod handles most of this now)
//             if (!value.bio.trim() || value.hourlyFee <= 0 || value.monthlyFee <= 0) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Please provide valid information!",
//                 });
//                 return;
//             }
//             console.log(value)
//             const toastId = toast.loading("Creating Profile");
//             try {
//                 // Example call assuming you have the userId from elsewhere (e.g., props or auth hook)
//                 const res = await updateTutorProfileById(value, 0);

//                 if (!res.data || res.error) {
//                     toast.error("Internal server error", { id: toastId });
//                     return;
//                 }

//                 toast.success("Profile created successfully", { id: toastId });
//                 form.reset();
//             } catch (err) {
//                 toast.error("Internal server error", { id: toastId });
//             }
//         }
//     })

//     return (
//         <div>
//             <Card className="md:w-6/12 w-full mx-auto">
//                 <CardHeader>
//                     <CardTitle>Update Tutor Profile</CardTitle>
//                     <CardDescription>
//                         You can update your profile
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form
//                         id="create-subject-form"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             form.handleSubmit();
//                         }}>
//                         <FieldGroup>
//                             {/* BIO FIELD */}
//                             <form.Field name="bio" children={(field) => (
//                                 <Field>
//                                     <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
//                                     <Input
//                                         placeholder="Type your bio"
//                                         id={field.name}
//                                         value={field.state.value}
//                                         onChange={(e) => field.handleChange(e.target.value)}
//                                     />
//                                     {field.state.meta.isTouched && (
//                                         <FieldError errors={field.state.meta.errors} />
//                                     )}
//                                 </Field>
//                             )} />

//                             {/* HOURLY FEE FIELD */}
//                             <form.Field name="hourlyFee" children={(field) => (
//                                 <Field>
//                                     <FieldLabel htmlFor={field.name}>Hourly Fee</FieldLabel>
//                                     <Input
//                                         type="number"
//                                         placeholder="0"
//                                         id={field.name}
//                                         value={field.state.value}
//                                         // Conversion: String to Number
//                                         onChange={(e) => field.handleChange(Number(e.target.value))}
//                                     />
//                                     {field.state.meta.isTouched && (
//                                         <FieldError errors={field.state.meta.errors} />
//                                     )}
//                                 </Field>
//                             )} />

//                             {/* MONTHLY FEE FIELD */}
//                             <form.Field name="monthlyFee" children={(field) => (
//                                 <Field>
//                                     <FieldLabel htmlFor={field.name}>Monthly Fee</FieldLabel>
//                                     <Input
//                                         type="number"
//                                         placeholder="0"
//                                         id={field.name}
//                                         value={field.state.value}
//                                         // Conversion: String to Number
//                                         onChange={(e) => field.handleChange(Number(e.target.value))}
//                                     />
//                                     {field.state.meta.isTouched && (
//                                         <FieldError errors={field.state.meta.errors} />
//                                     )}
//                                 </Field>
//                             )} />

//                             {/* EXPERIENCE FIELD */}
//                             <form.Field name="experience" children={(field) => (
//                                 <Field>
//                                     <FieldLabel htmlFor={field.name}>Experience (Years)</FieldLabel>
//                                     <Input
//                                         type="number"
//                                         placeholder="0"
//                                         id={field.name}
//                                         value={field.state.value}
//                                         // Conversion: String to Number
//                                         onChange={(e) => field.handleChange(Number(e.target.value))}
//                                     />
//                                     {field.state.meta.isTouched && (
//                                         <FieldError errors={field.state.meta.errors} />
//                                     )}
//                                 </Field>
//                             )} />

//                             {/* ২. Category Dropdown */}
//                             <form.Field name="categoryId" children={(field) => (
//                                 <Field>
//                                     <FieldLabel>Category</FieldLabel>
//                                     <Select onValueChange={field.handleChange} value={field.state.value}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select category" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {categoryData.map((sub) => (
//                                                 <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </Field>
//                             )} />
//                         </FieldGroup>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end flex-col gap-5">
//                     <Button form="create-subject-form" type="submit" className="w-full">
//                         Update Profile
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }





"use client";

import { updateTutorProfileById } from "@/actions/tutor.action";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { X, Save, GraduationCap, Banknote, LayoutGrid } from "lucide-react";
import z from "zod";
import Swal from "sweetalert2";
import { finalUpdateCategoryById } from "@/actions/finalCategory.action";


// ১. ভ্যালিডেশন স্কিমা
const formSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    hourlyFee: z.number().min(1, "Hourly Fee is required"),
    monthlyFee: z.number().min(1, "Monthly Fee is required"),
    experience: z.number().min(0, "Experience cannot be negative"),
    categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

type TutorFormValues = z.infer<typeof formSchema>;

interface TutorProfileComponentProps {
    initialData: any;
    allCategory: any[];
}

export default function TutorProfileComponent({
    initialData,
    allCategory,
}: TutorProfileComponentProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ২. ফর্ম সেটআপ
    const form = useForm({
        defaultValues: {
            bio: initialData?.bio || "",
            hourlyFee: initialData?.hourlyFee || 0,
            monthlyFee: initialData?.monthlyFee || 0,
            experience: initialData?.experience || 0,
            categoryIds: initialData?.categories?.map((c: any) => c.id) || [],
        } as TutorFormValues,
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            // Simplified validation check(Zod handles most of this now)
            if (!value.bio.trim() || value.hourlyFee <= 0 || value.monthlyFee <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please provide valid information!",
                });
                return;
            }
            setIsSubmitting(true);
            const toastId = toast.loading("Updating your profile...");
            try {
                // এখানে আপনার Server Action কল করা হচ্ছে
                const res = await updateTutorProfileById(value, 0);

                if (res?.error) {
                    toast.error(res.error.message || "Something went wrong");
                    setIsSubmitting(false);
                } else {
                    toast.success("Profile updated successfully!", { id: toastId });
                }
            } catch (err) {
                toast.error("Something went wrong. Please try again.", { id: toastId });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-3xl mx-auto shadow-lg border-t-4 border-t-primary">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-primary" size={24} />
                        <CardTitle className="text-2xl">Update Tutor Profile</CardTitle>
                    </div>
                    <CardDescription>
                        This information will be displayed to students on the search page.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        id="tutor-update-form"
                        className="space-y-8"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="space-y-6">
                            {/* BIO FIELD */}
                            <form.Field
                                name="bio"
                                children={(field) => (
                                    <Field className="space-y-2">
                                        <FieldLabel className="font-semibold">Professional Bio</FieldLabel>
                                        <Textarea
                                            placeholder="Share your expertise and teaching style..."
                                            className="min-h-[120px] bg-slate-50/50"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* HOURLY FEE */}
                                <form.Field
                                    name="hourlyFee"
                                    children={(field) => (
                                        <Field className="space-y-2">
                                            <FieldLabel className="flex items-center gap-2">
                                                <Banknote size={16} /> Hourly Fee (BDT)
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                            />
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />

                                {/* MONTHLY FEE */}
                                <form.Field
                                    name="monthlyFee"
                                    children={(field) => (
                                        <Field className="space-y-2">
                                            <FieldLabel>Monthly Fee (BDT)</FieldLabel>
                                            <Input
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                            />
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />

                                {/* EXPERIENCE */}
                                <form.Field
                                    name="experience"
                                    children={(field) => (
                                        <Field className="space-y-2">
                                            <FieldLabel>Experience (Years)</FieldLabel>
                                            <Input
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                            />
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* MULTI-SELECT CATEGORY FIELD */}
                            <form.Field
                                name="categoryIds"
                                children={(field) => (
                                    <Field className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <FieldLabel className="text-lg font-bold flex items-center gap-2">
                                                <LayoutGrid size={18} className="text-primary" />
                                                Teaching Categories
                                            </FieldLabel>
                                            <span className="text-xs text-muted-foreground">
                                                Selected: {field.state.value.length}
                                            </span>
                                        </div>

                                        {/* Selected Categories Badges */}
                                        <div className="flex flex-wrap gap-2 p-3 min-h-[50px] bg-slate-100/50 rounded-xl border border-dashed border-slate-300">
                                            {field.state.value.length > 0 ? (
                                                field.state.value.map((id: string) => {
                                                    const cat = allCategory.find((c) => c.id === id);
                                                    return (
                                                        <Badge key={id} className="pl-3 pr-1 py-1 gap-1 animate-in fade-in zoom-in duration-200">
                                                            {cat?.name}
                                                            <X
                                                                size={14}
                                                                className="cursor-pointer hover:bg-primary-foreground/20 rounded-full"
                                                                onClick={() =>
                                                                    field.handleChange(
                                                                        field.state.value.filter((v: string) => v !== id)
                                                                    )
                                                                }
                                                            />
                                                        </Badge>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-sm text-muted-foreground italic w-full text-center py-2">
                                                    Please select at least one category below.
                                                </p>
                                            )}
                                        </div>

                                        {/* Checkbox Selection Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white border rounded-xl max-h-[220px] overflow-y-auto custom-scrollbar">
                                            {allCategory.map((cat) => (
                                                <div
                                                    key={cat.id}
                                                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-slate-50 ${field.state.value.includes(cat.id) ? "bg-primary/5" : ""
                                                        }`}
                                                >
                                                    <Checkbox
                                                        id={cat.id}
                                                        checked={field.state.value.includes(cat.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                field.handleChange([...field.state.value, cat.id]);
                                                            } else {
                                                                field.handleChange(
                                                                    field.state.value.filter((v: string) => v !== cat.id)
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={cat.id}
                                                        className="text-sm font-medium cursor-pointer flex-1 select-none"
                                                    >
                                                        {cat.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <FieldError errors={field.state.meta.errors} />
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="bg-slate-50/50 p-6 border-t rounded-b-2xl">
                    <Button
                        type="submit"
                        form="tutor-update-form"
                        className="w-full md:w-auto ml-auto flex gap-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            "Updating..."
                        ) : (
                            <>
                                <Save size={18} /> Update Profile
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}