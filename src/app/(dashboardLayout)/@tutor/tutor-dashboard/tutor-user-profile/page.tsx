import { getSingleTutorUserById } from "@/actions/tutor.action";
import TutorUserProfilePageComponent from "@/components/modules/tutor/TutorUserProfilePageComponent";
import { userService } from "@/services/user.service";

export default async function TutorUserProfilePage() {
  // Your example data
//   const exampleUser = {
//     name: 'Tonmoy Khan',
//     email: 'tonmoykhan.free@gmail.com',
//     emailVerified: true,
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocIdaJZEQ-eur5QZf3cwFuZnOVZ6Fl2ODt8ZpURz7rkazWnJ0U4=s96-c',
//     createdAt: '2026-03-02T09:40:36.739Z',
//     updatedAt: '2026-03-02T09:40:36.739Z',
//     role: 'STUDENT',
//     phone: null,
//     status: 'ACTIVE',
//     id: 'mjG25tnAY8KR6bi4KfFtUq54MYtkU6kI'
//   };

  const { data } = await userService.getSession();
//   // console.log("aaaaa",data.user.id)

  const res = await getSingleTutorUserById(data.user.id ,10);
  console.log("resrea",res.data)

  return (
    <TutorUserProfilePageComponent user={res.data} />

  );
}