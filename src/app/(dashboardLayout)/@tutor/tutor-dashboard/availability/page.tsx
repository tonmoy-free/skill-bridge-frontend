import AvailabilityForm from "@/components/modules/admin/availability/AvailabilityForm";
import { userService } from "@/services/user.service";

export default async function Availability() {
    const { data } = await userService.getSession();
    
      const session = data?.user || null;
    
    //   console.log("from navbar",session.id)

    return (
        <div>
            <AvailabilityForm  />
        </div>
    );
}