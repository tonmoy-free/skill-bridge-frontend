"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { createReview } from "@/actions/review.action";
import { toast } from "sonner";

export default function ReviewModal({ booking }: { booking: any }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) return toast.error("Please select a rating");

        const toastId = toast.loading("Submitting your review...");

        const res = await createReview({
            rating,
            comment,
            bookingId: booking.id,
            tutorId: booking.tutorId,
            studentId: booking.studentId,
        });

        if (res.error) {
            toast.error(res.error.message || "Failed to submit review", { id: toastId });
        } else {
            // যদি error না থাকে, তার মানে অপারেশন সফল
            toast.success("Thank you for your review!", { id: toastId });
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="default">Leave a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate your session with {booking.tutor.user.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {/* Star Rating */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={32}
                                className={`cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                    }`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    <Textarea
                        placeholder="Write your experience here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />

                    <Button className="w-full" onClick={handleSubmit}>
                        Submit Review
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}