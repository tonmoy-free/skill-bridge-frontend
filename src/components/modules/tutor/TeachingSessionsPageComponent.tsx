// app/dashboard/teaching-sessions/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachingSessionCardComponent from "./TeachingSessionCardComponent";
import { getSingleBookingTutorUserById } from "@/actions/tutor.action";
import { userService } from "@/services/user.service";

// আপনার সার্ভার অ্যাকশন বা সার্ভিস থেকে ডাটা কল করুন
// import { getTutorSessions } from "@/actions/booking.action"; 

export default async function TeachingSessionsPageComponent() {
  const { data } = await userService.getSession();
  // console.log("aaaaa",data.user.id)

  // এখানে টিউটরের আইডি অনুযায়ী সেশনগুলো ফেচ করুন
  const res = await getSingleBookingTutorUserById(data.user.id, 10);
  const sessions = res.data.data || [];
  console.log(res.data.data)

  // const sessions = [
  //   {
  //     id: "1",
  //     status: "BOOKED",
  //     date: new Date(),
  //     startTime: "10:00 AM",
  //     endTime: "11:00 AM",
  //     duration: 60,
  //     student: { name: "Abir Hossain", image: "", email: "abir@example.com" }
  //   },
  //   {
  //     id: "2",
  //     status: "COMPLETED",
  //     date: new Date(),
  //     startTime: "02:00 PM",
  //     endTime: "03:30 PM",
  //     duration: 90,
  //     student: { name: "Sakib Ahmed", image: "", email: "sakib@example.com" }
  //   }
  // ];

  const filterSessions = (status: string) => sessions.filter((s:any) => s.status === status);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Teaching Sessions</h1>
        <p className="text-muted-foreground">Manage your upcoming and past classes with students.</p>
      </div>

      <Tabs defaultValue="UPCOMING" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="UPCOMING" className="space-y-4">
          {filterSessions("BOOKED").length > 0 ? (
            filterSessions("BOOKED").map((session :any) => (
              <TeachingSessionCardComponent key={session.id} booking={session} />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground border rounded-lg border-dashed">
              No upcoming sessions found.
            </div>
          )}
        </TabsContent>

        <TabsContent value="COMPLETED" className="space-y-4">
          {filterSessions("COMPLETED").map((session :any) => (
            <TeachingSessionCardComponent key={session.id} booking={session} />
          ))}
        </TabsContent>

        <TabsContent value="CANCELLED" className="space-y-4">
          {filterSessions("CANCELLED").map((session :any) => (
            <TeachingSessionCardComponent key={session.id} booking={session} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
    
  );
}