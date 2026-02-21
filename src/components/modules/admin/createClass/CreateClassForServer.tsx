import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import CreateClassToast from "./CreateClassToast";

const API_URL = env.API_URL;

export default function CreateClassForServer() {
    const createClass = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string;

        if (!name || !name.trim()) {
            console.log("empty")
            redirect("/admin-dashboard/create-class?error=empty");
        }


    // akadik data thakle
    // const className ={
    //     name,
    //     tags:tags.splite(",").map(item=>item.trim()).filter(item=> item != ""),
    // }

    // console.log(JSON.stringify(name))

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/class`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name }),
    });

    // update korar sathe sathe jate change hoi. "blogPosts" astese service a jai khane data get kora hocche. name same hote hobe,revalidate tag
    // if(res.ok){
    //     revalidateTag("blogPosts", "max");
    // }

    if (res.ok) {
        redirect("/admin-dashboard/create-class?success=true");
    }
    // toast.success("Post Created");
}
return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Create Blog</CardTitle>
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