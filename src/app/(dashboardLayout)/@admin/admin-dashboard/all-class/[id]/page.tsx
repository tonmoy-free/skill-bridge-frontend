import { getSingleClassById, updateSingleClassById } from "@/actions/class.action";
import CreateClassToast from "@/components/modules/admin/createClass/CreateClassToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export default async function ClassPageById({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log("Received ID in page component:", id);

    const response = await getSingleClassById(id, 10); // এখানে revalidate 10 সেকেন্ড সেট করা হয়েছে
    const { name } = response.data;
    console.log("Fetched class data:", name);

    const createClass = async (formData: FormData) => {
        "use server";

        const updatedName = formData.get("name") as string;

        if (!updatedName || !updatedName.trim()) {
            redirect(`/admin-dashboard/all-class?error=empty&id=${id}`);
        }

        let isSuccess = false;

        try {
            const res = await updateSingleClassById(id, { name: updatedName }, 10);
            
            // ডেটা চেক করার লজিক
            if (res.data) {
                isSuccess = true;
            }
        } catch (err) {
            console.error("Update failed:", err);
            // এখানে Swal ব্যবহার করবেন না, কারণ এটি সার্ভার সাইড।
            // এররের জন্য রিডাইরেক্ট করে মেসেজ পাঠাতে পারেন।
            redirect(`/admin-dashboard/all-class?error=failed&id=${id}`);
        }

        // রিডাইরেক্ট অবশ্যই try-catch এর বাইরে করতে হবে
        if (isSuccess) {
            redirect(`/admin-dashboard/all-class?success=updated&id=${id}`);
        }
    }
    return (
        <Card className="w-8/12 mx-auto">
            <CardHeader>
                <CardTitle>Update Class Name</CardTitle>
                <CardDescription>You can write your Class name</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="class-form" action={createClass}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Class Name</FieldLabel>
                            <Input type="text" name="name" placeholder="" defaultValue={name} />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="class-form" type="submit" className="w-full">Submit</Button>
            </CardFooter>
            <CreateClassToast />
        </Card>
    );
}