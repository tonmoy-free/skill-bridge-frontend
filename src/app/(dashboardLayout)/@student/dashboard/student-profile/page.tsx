import StudentProfilePageComponent from "@/components/modules/student/StudentProfilePageComponent";

export default function StudentProfilePage() {
    // Your example data
  const exampleUser = {
    name: 'Tonmoy Khan',
    email: 'tonmoykhan.free@gmail.com',
    emailVerified: true,
    image: 'https://lh3.googleusercontent.com/a/ACg8ocIdaJZEQ-eur5QZf3cwFuZnOVZ6Fl2ODt8ZpURz7rkazWnJ0U4=s96-c',
    createdAt: '2026-03-02T09:40:36.739Z',
    updatedAt: '2026-03-02T09:40:36.739Z',
    role: 'STUDENT',
    phone: null,
    status: 'ACTIVE',
    id: 'mjG25tnAY8KR6bi4KfFtUq54MYtkU6kI'
  };
    return (
        <StudentProfilePageComponent user={exampleUser} />
    );
}