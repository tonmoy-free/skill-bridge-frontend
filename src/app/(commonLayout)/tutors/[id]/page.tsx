import { blogService } from "@/services/blog.service";

export default async function TutorProfileSinglePage({ params }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    const {data} = await blogService.getTutorById(id);

    
    
    return (
        <div>
            <h1>This is Tutor ProfileSingle Page component.{id}</h1>
        </div>
    )
}