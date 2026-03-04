import { getAvailabilityById, getTutorProfileById } from "@/actions/tutor.action";
import AvailabilityForm from "@/components/modules/admin/availability/AvailabilityForm";
import { userService } from "@/services/user.service";

export default async function Availability() {
    const { data } = await userService.getSession();

    const session = data?.user || null;
    const tutorProfileID = await getTutorProfileById(2);
    console.log(tutorProfileID.data.id)
    
    const avilabilityById = await getAvailabilityById(tutorProfileID.data.id , 2)
    console.log("tutorProfileID.data.id",avilabilityById)
    //   console.log("from navbar",session.id)

    return (
        <div>
            <AvailabilityForm  avilabilityById ={avilabilityById}/>
        </div>
    );
}