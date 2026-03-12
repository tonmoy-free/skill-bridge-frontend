"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cancelBookingFromDB } from "@/actions/booking.action";

export default function BookingCard({ booking, isUpcoming }: { booking: any, isUpcoming: boolean }) {
    const statusColors: any = {
        BOOKED: "bg-blue-100 text-blue-700",
        COMPLETED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };
    const router = useRouter();

    const handleCancel = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        });

        if (confirm.isConfirmed) {
            const toastId = toast.loading("Cancelling booking...");

            // ১. ফাংশন কল করুন
            const res = await cancelBookingFromDB(booking.id);

            // ২. success এর বদলে error চেক করুন
            if (res.error) {
                // যদি এরর থাকে
                toast.error(res.error.message || "Failed to cancel", { id: toastId });
            } else {
                // যদি এরর না থাকে (তার মানে অপারেশন সফল)
                toast.success("Booking cancelled successfully", { id: toastId });

                // ৩. পেজ রিফ্রেশ করুন যাতে স্ট্যাটাস আপডেট দেখা যায়
                router.refresh();
            }
        }
    };

    return (
        <Card className={`overflow-hidden border-l-4 ${isUpcoming ? 'border-l-primary' : 'border-l-slate-300'}`}>
            <CardContent className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                            <span className="text-xs text-muted-foreground">ID: {booking.id.slice(0, 8)}</span>
                        </div>

                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <User size={18} className="text-primary" />
                            Tutor: {booking.tutor.user.name}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {format(new Date(booking.date), "PPP")}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {booking.startTime} - {booking.endTime} ({booking.duration} min)
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {isUpcoming && booking.status === "BOOKED" && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleCancel}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none"
                            >
                                Cancel Booking
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}