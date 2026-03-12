import { getTutorProfileById } from "@/actions/tutor.action";
import CreateTutorProfileComponent from "@/components/modules/tutor/CreateTutorProfile";
import TutorProfilePage from "@/components/modules/tutor/TutorProfilePage";
import { redirect } from "next/navigation";


export default async function TutorProfile() {
    const response = await getTutorProfileById(10);
    // console.log("Response from getSingleSubjectsById:", response);

    //    const response = 
    //         {
    //             "id": "21e26661-d5dd-4b0c-8d27-a0706b92db7f",
    //             "userId": "Nwe432eloj4SX6mbQXY4Ot2k68udQwc2",
    //             "bio": "I am an expert in Mathematics with a focus on Calculus and Algebra. I help students prepare for board exams and university admission tests with simplified techniques.",
    //             "hourlyFee": 300,
    //             "monthlyFee": 3000,
    //             "experience": 3,
    //             "rating": 4.8,
    //             "user": {
    //                 "name": "Rahim Uddin",
    //                 "email": "rahim@metleaf.com",
    //                 "image": "https://github.com/shadcn.png"
    //             },
    //             "categories": [{ "id": "cat1", "name": "Mathematics" }],
    //             "availability": [
    //                 { "dayOfWeek": 0, "startTime": "10:00", "endTime": "12:00" },
    //                 { "dayOfWeek": 1, "startTime": "16:00", "endTime": "18:00" }
    //             ],
    //             "reviews": [
    //                 { "id": "r1", "rating": 5, "comment": "Amazing teacher! Simplified complex integration." }
    //             ]
    //         }


   if (!response || !response.data) {
        redirect("/tutor-dashboard/create-tutor-profile");
    }

    return (
        // <CreateTutorProfileComponent initialData={response?.data} />
        <TutorProfilePage data={response?.data} />
    );
}