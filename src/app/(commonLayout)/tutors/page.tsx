import { getAllTutorProfile } from "@/actions/tutor.action";
import FindTutorPage from "@/components/commonLayout/FindTutorPage";
import { userService } from "@/services/user.service";

export default async function TutorProfilePage() {
    const response = await getAllTutorProfile(10);
    const { data } = await userService.getSession();

    return (
        <div>
            <FindTutorPage response={response} data={data} />
        </div>
    )
}