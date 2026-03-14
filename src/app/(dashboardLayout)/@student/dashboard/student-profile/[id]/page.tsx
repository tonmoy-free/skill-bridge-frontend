import { getSingleStudentById } from "@/actions/student.action";
import EditProfilePage from "@/components/modules/student/EditProfilePage";

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
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
  
  const data = await getSingleStudentById(id ,10);
  // console.log("Resolved ID:", data.data);

  return (
    <EditProfilePage user={data.data}  />
  );
}