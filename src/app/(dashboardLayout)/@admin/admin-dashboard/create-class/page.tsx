import CreateClassForServer from "@/components/modules/admin/createClass/CreateClassForServer";
import { blogService } from "@/services/blog.service";
import { TutorProfile } from "@/types";

export default async function CreateClassPage() {
    const { data } = await blogService.getBlogPosts();

    return (
        <div>
            <CreateClassForServer></CreateClassForServer>
            {data.map((item: TutorProfile) => <p key={item.id}>{item.bio}</p>)}
        </div>
    );
}