import { getSingleTutorUserById } from "@/actions/tutor.action";
import EditTutorUserProfilePage from "@/components/modules/tutor/EditTutorUserProfilePageComponent";

export default async function TutoUserProfilePageById({ params }: { params: Promise<{ id: string }> }) {
  // ১. params-কে await করতে হবে (Next.js 15 এর নিয়ম)
    const { id } = await params;

    
    // const data = {
      //   "id": "mjG25tnAY8KR6bi4KfFtUq54MYtkU6kI",
  //   "name": "Tonmoy Khan",
  //   "email": "tonmoykhan.free@gmail.com",
  //   "phone": "+8801712345678",
  //   "image": "https://avatars.githubusercontent.com/u/1234567?v=4",
  //   "role": "STUDENT",
  //   "status": "ACTIVE",
  //   "emailVerified": true,
  //   "createdAt": "2026-03-02T09:40:36.739Z"
  // }
  
  const data = await getSingleTutorUserById(id ,10);
  // console.log("Resolved ID:", data.data);

  return (
    <EditTutorUserProfilePage user={data.data}  />
  );
}