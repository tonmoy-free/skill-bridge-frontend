// "use client"
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, Clock, Star, User } from "lucide-react";
// import { format } from "date-fns";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { cancelBookingFromDB } from "@/actions/booking.action";
// import ReviewModal from "./ReviewModal";

// export default function BookingCard({ booking, isUpcoming }: { booking: any, isUpcoming: boolean }) {
//     const statusColors: any = {
//         BOOKED: "bg-blue-100 text-blue-700",
//         COMPLETED: "bg-green-100 text-green-700",
//         CANCELLED: "bg-red-100 text-red-700",
//     };
//     const router = useRouter();

//     const handleCancel = async () => {
//         const confirm = await Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to cancel this booking?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, cancel it!",
//         });

//         if (confirm.isConfirmed) {
//             const toastId = toast.loading("Cancelling booking...");

//             // ১. ফাংশন কল করুন
//             const res = await cancelBookingFromDB(booking.id);

//             // ২. success এর বদলে error চেক করুন
//             if (res.error) {
//                 // যদি এরর থাকে
//                 toast.error(res.error.message || "Failed to cancel", { id: toastId });
//             } else {
//                 // যদি এরর না থাকে (তার মানে অপারেশন সফল)
//                 toast.success("Booking cancelled successfully", { id: toastId });

//                 // ৩. পেজ রিফ্রেশ করুন যাতে স্ট্যাটাস আপডেট দেখা যায়
//                 router.refresh();
//             }
//         }
//     };


//     return (
//         <Card className={`overflow-hidden border-l-4 ${isUpcoming ? 'border-l-primary' : 'border-l-slate-300'}`}>
//             <CardContent className="p-5">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                     <div className="space-y-2">
//                         <div className="flex items-center gap-2">
//                             <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
//                             <span className="text-xs text-muted-foreground">ID: {booking.id.slice(0, 8)}</span>
//                         </div>

//                         <h3 className="font-bold text-lg flex items-center gap-2">
//                             <User size={18} className="text-primary" />
//                             Tutor: {booking.tutor.user.name}
//                         </h3>

//                         <div className="flex flex-wrap gap-4 text-sm text-slate-600">
//                             <div className="flex items-center gap-1">
//                                 <Calendar size={14} />
//                                 {format(new Date(booking.date), "PPP")}
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <Clock size={14} />
//                                 {booking.startTime} - {booking.endTime} ({booking.duration} min)
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex gap-2">
//                         {/* সেশন কমপ্লিট হলে এবং রিভিউ না থাকলে */}
//                         {!isUpcoming && booking.status === "COMPLETED" && !booking.review && (
//                             <ReviewModal booking={booking} />
//                         )}

//                         {/* যদি অলরেডি রিভিউ দেওয়া থাকে */}
//                         {booking.review && (
//                             <div className="flex items-center gap-1 text-yellow-600 font-medium text-sm">
//                                 <Star size={14} className="fill-current" /> {booking.review.rating}/5
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, User } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cancelBookingFromDB } from "@/actions/booking.action";
import ReviewModal from "./ReviewModal";

export default function BookingCard({ booking, isUpcoming }: { booking: any, isUpcoming: boolean }) {
    const router = useRouter();

    const statusColors: any = {
        BOOKED: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", // Tailwind destructive red
            cancelButtonColor: "#3b82f6", // Tailwind primary blue
            confirmButtonText: "Yes, cancel it!",
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });

        if (result.isConfirmed) {
            const toastId = toast.loading("Cancelling booking...");

            try {
                const res = await cancelBookingFromDB(booking.id);

                if (res?.error) {
                    toast.error(res.error.message || "Failed to cancel", { id: toastId });
                } else {
                    toast.success("Booking cancelled successfully", { id: toastId });
                    router.refresh();
                }
            } catch (error) {
                toast.error("Something went wrong", { id: toastId });
            }
        }
    };

    return (
        <Card className={`overflow-hidden border-l-4 transition-all hover:shadow-md dark:bg-slate-900 ${isUpcoming ? 'border-l-blue-500' : 'border-l-slate-300'}`}>
            <CardContent className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`${statusColors[booking.status]} border-none`}>
                                {booking.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono">ID: {booking.id.slice(0, 8)}</span>
                        </div>

                        <h3 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                            <User size={18} className="text-blue-500" />
                            Tutor: {booking.tutor?.user?.name || "Unknown Tutor"}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} className="text-blue-500" />
                                {booking.date ? format(new Date(booking.date), "PPP") : "N/A"}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-blue-500" />
                                {booking.startTime} - {booking.endTime} ({booking.duration} min)
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* রিভিউ সেকশন */}
                        {!isUpcoming && booking.status === "COMPLETED" && !booking.review && (
                            <ReviewModal booking={booking} />
                        )}

                        {booking.review && (
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full text-yellow-600 dark:text-yellow-500 font-bold text-sm border border-yellow-200 dark:border-yellow-800">
                                <Star size={14} className="fill-current" /> {booking.review.rating}/5
                            </div>
                        )}

                        {/* ক্যান্সেল বাটন (শুধুমাত্র যদি বুকিংটি এখনো 'BOOKED' থাকে) */}
                        {isUpcoming && booking.status === "BOOKED" && (
                            <Button
                                size="sm"
                                onClick={handleCancel}
                                // নরমাল মোডে বর্ডার থাকবে, হোভার করলে ব্যাকগ্রাউন্ড লাল হবে
                                className="font-semibold border-2 border-red-500 text-red-600 bg-transparent hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Cancel Booking
                            </Button>
                        )}

                        {/* ক্যান্সেলড স্ট্যাটাস দেখালে বাটন হাইড থাকবে */}
                        {booking.status === "CANCELLED" && (
                            <span className="text-sm font-medium text-red-500 italic">Cancelled</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}