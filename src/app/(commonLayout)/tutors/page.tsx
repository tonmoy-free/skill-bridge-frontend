import { getAllTutorProfile } from "@/actions/tutor.action";
import FindTutorPage from "@/components/commonLayout/FindTutorPage";

export default async function TutorProfilePage() {
    const response = await getAllTutorProfile(10);

    return (
        <div>
            <FindTutorPage response={response} />
        </div>
    )
}