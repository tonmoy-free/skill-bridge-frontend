import { getTutorProfileByIdForCommonLayout } from "@/actions/tutor.action";
import BookingComponent from "@/components/commonLayout/tutor/BookingComponent";
import { userService } from "@/services/user.service";

interface BookingPageProps {
    params: Promise<{ id: string }>; // ডায়নামিক রুট থেকে ID
}

export default async function BookingPage({ params }: BookingPageProps) {
    // ১. URL থেকে ID এবং সেশন থেকে ইউজার সংগ্রহ করুন
    const { id } = await params;
    const { data: session } = await userService.getSession();
    const tutorData = await getTutorProfileByIdForCommonLayout(id, 10);
    console.log("tutorddata", tutorData)

    return (
        <div className="mt-20 container mx-auto px-4">
            {/* <h1 className="text-2xl font-bold mb-6">Book a Session with {tutorData.user.name}</h1> */}

            {/* ৩. প্রপসগুলো BookingComponent এ পাস করুন */}
            <BookingComponent
                tutor={tutorData.data}
                studentId={session.user.id}
            />
        </div>

    )
};