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

    const createClass = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string;

        if (!name || !name.trim()) {
            console.log("empty")
            redirect(`/admin-dashboard/all-class?error=empty&id=${id}`);
        }
    }
    return (
        <Card className="w-8/12 mx-auto">
            <CardHeader>
                <CardTitle>Create Class Name</CardTitle>
                <CardDescription>You can write your Class name</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="class-form" action={createClass}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Class Name</FieldLabel>
                            <Input type="text" name="name" />
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