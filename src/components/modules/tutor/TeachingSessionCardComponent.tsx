// components/dashboard/tutor/TeachingSessionCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User } from "lucide-react";

export default function TeachingSessionCardComponent({ booking }: { booking: any }) {
  const statusColors: any = {
    BOOKED: "bg-blue-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Student Info */}
          <div className="flex gap-4 items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={booking.student.image} />
              <AvatarFallback>{booking.student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold flex items-center gap-2">
                {booking.student.name} 
                <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
              </h4>
              <p className="text-sm text-muted-foreground">{booking.student.email}</p>
            </div>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={16} />
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} />
              <span>{booking.startTime} - {booking.endTime}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={16} />
              <span>{booking.duration} Minutes</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}