import { getTutorProfileById } from "@/actions/tutor.action";
import TutorProfileComponent from "@/components/modules/tutor/TutorProfileComponent";


export default async function TutorProfile() {

    const response = await getTutorProfileById(10);
    // console.log("Response from getSingleSubjectsById:", response);

    return (
        <TutorProfileComponent initialData={response?.data} />
    );
}