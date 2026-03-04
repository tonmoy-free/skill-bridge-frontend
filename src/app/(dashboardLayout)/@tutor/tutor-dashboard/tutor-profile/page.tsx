import { getTutorProfileById } from "@/actions/tutor.action";
import CreateTutorProfileComponent from "@/components/modules/tutor/CreateTutorProfile";

export default async function TutorProfile() {

    const response = await getTutorProfileById(10);
    // console.log("Response from getSingleSubjectsById:", response);

    return (
        <CreateTutorProfileComponent initialData={response?.data} />
    );
}