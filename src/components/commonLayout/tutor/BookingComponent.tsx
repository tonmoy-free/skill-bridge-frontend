"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { createBookingIntoDB } from "@/actions/booking.action";
import { useRouter } from "next/navigation";
import { isBefore, startOfToday, parse, differenceInMinutes } from "date-fns";

export default function BookingComponent({ tutor, studentId }: { tutor: any, studentId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const router = useRouter();

  // ১. স্লট ফিল্টারিং লজিক (ডেট এবং টাইম অনুযায়ী)
  const availableSlots = tutor.availability.filter((slot: any) => {
    // দিন মিলছে কি না চেক
    const isSameDay = slot.dayOfWeek === selectedDate?.getDay();
    if (!isSameDay) return false;

    // যদি আজকের ডেট সিলেক্ট করা হয়, তবে সময় চেক করবে
    const today = new Date();
    const isSelectedToday = selectedDate?.toDateString() === today.toDateString();

    if (isSelectedToday) {
      // স্লটের স্টার্ট টাইমকে আজকের ডেটের সাথে কম্পেয়ার করার জন্য ফরম্যাট করা
      const slotTime = parse(slot.startTime, "HH:mm", new Date());
      // বর্তমান সময়ের চেয়ে স্লটের সময় কম হলে সেটি বাদ (Filter out past slots)
      return isBefore(today, slotTime);
    }

    return true; // ভবিষ্যতের ডেট হলে সব স্লট দেখাবে
  });

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a valid date and time slot!");
      return;
    }

    // ১. স্টার্ট টাইম এবং এন্ড টাইমকে ডেট অবজেক্টে রূপান্তর (একই রেফারেন্স ডেট ব্যবহার করে)
    const baseDate = new Date();
    const start = parse(selectedSlot.startTime, "HH:mm", baseDate);
    const end = parse(selectedSlot.endTime, "HH:mm", baseDate);

    // ২. ডিউরেশন ক্যালকুলেট করা (মিনিটে)
    const duration = differenceInMinutes(end, start);

    // ৩. ডাটা অবজেক্ট তৈরি
    const bookingData = {
      studentId,
      tutorId: tutor.id,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      duration: duration, // অটো ক্যালকুলেটেড ডিউরেশন (যেমন: 60 বা 90)
    };

    const toastId = toast.loading("Processing your booking...");

    try {
      const res = await createBookingIntoDB(bookingData);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Booking successful!", { id: toastId });
      // router.push("/dashboard/bookings");
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader><CardTitle>Select Date</CardTitle></CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedSlot(null); // ডেট চেঞ্জ করলে স্লট রিসেট
            }}
            // ২. আজকের আগের সব ডেট ডিজেবল করা
            disabled={(date) => isBefore(date, startOfToday())}
            className="rounded-md border shadow"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Available Slots</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot: any) => (
                <Button
                  key={slot.id}
                  variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-sm text-center py-4">
              {selectedDate?.toDateString() === new Date().toDateString()
                ? "No more slots available for today."
                : "No slots available for this day."}
            </p>
          )}

          <Button
            className="w-full mt-6"
            disabled={!selectedSlot}
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}