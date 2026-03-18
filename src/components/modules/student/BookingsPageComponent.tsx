
import { userService } from "@/services/user.service";
import BookingCard from "./BookingCard";
import { getMyBookingsFromDB } from "@/actions/booking.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default async function BookingsPage() {
  const { data: session } = await userService.getSession();
  
  // ১. রেসপন্সটি কল করুন
  const response = await getMyBookingsFromDB();
  console.log("response",response)

  // ২. আপনার JSON অনুযায়ী ডাটা এক্সেস করুন
  // যেহেতু অ্যাকশন রিটার্ন করে { data: ... }, আর আপনার JSON এর ভেতরেও আছে "data": [...]
  // তাই আমাদের response.data.data চেক করতে হবে
  const bookings = Array.isArray(response?.data?.data) 
    ? response.data.data 
    : [];

  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));

  // ৩. এখন .filter ঠিকভাবে কাজ করবে
  const upcomingBookings = bookings.filter((b: any) => 
    new Date(b.date) >= todayStart && b.status === "BOOKED"
  );

  const pastBookings = bookings.filter((b: any) => 
    new Date(b.date) < todayStart || b.status !== "BOOKED"
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Sessions ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past / Cancelled ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((b: any) => <BookingCard key={b.id} booking={b} isUpcoming={true} />)
          ) : (
            <p className="text-center text-muted-foreground py-10">No upcoming bookings found.</p>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map((b: any) => <BookingCard key={b.id} booking={b} isUpcoming={false} />)
          ) : (
            <p className="text-center text-muted-foreground py-10">No past records found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}