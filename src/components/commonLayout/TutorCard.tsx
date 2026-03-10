import { Star, BookOpen, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import defaultTutor from "../../../public/Image/defaultTutor.png";

export default function TutorCard({ tutor }: { tutor: any }) {
  const { user, bio, hourlyFee, rating, experience, categories, id } = tutor;
  const imageSrc = user.image ? user.image : defaultTutor.src;

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          {/* <AvatarImage src={user.image} alt={user.name} /> */}
          {user.image ? (<AvatarImage src={user.image} />) : (<AvatarImage src={imageSrc} alt="Default Avatar" />)}
          <AvatarFallback className="bg-slate-100 font-bold text-lg">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-slate-900 leading-tight">
              {user.name}
            </h3>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md text-yellow-700 text-xs font-bold">
              <Star className="fill-current w-3 h-3 mr-1" /> 
              {rating > 0 ? rating.toFixed(1) : "New"}
            </div>
          </div>
          <p className="text-sm text-primary font-medium">
            {experience} Years Experience
          </p>
        </div>
      </CardHeader>

      <CardContent className="text-sm space-y-4 flex-1">
        {/* Categories / Subjects */}
        <div className="flex items-start gap-2 text-slate-600">
          <BookOpen size={16} className="mt-0.5 text-slate-400 flex-shrink-0" />
          <span className="line-clamp-1">
            {categories && categories.length > 0 
              ? categories.map((c: any) => c.name).join(", ") 
              : "General Subjects"}
          </span>
        </div>

        {/* Pricing Info */}
        <div className="flex items-center gap-2 text-slate-600">
          <Clock size={16} className="text-slate-400 flex-shrink-0" />
          <span className="font-semibold text-slate-900">{hourlyFee} BDT</span>
          <span className="text-xs text-muted-foreground">/ hour</span>
        </div>

        {/* Bio */}
        <p className="line-clamp-2 text-slate-500 italic leading-relaxed">
          "{bio}"
        </p>
      </CardContent>

      <CardFooter className="flex gap-3 border-t bg-slate-50/50 p-4 mt-auto">
        <Link href={`/tutors/${user.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-white hover:bg-slate-100">
            View Profile
          </Button>
        </Link>
        <Button className="flex-1 gap-1">
          Book Now <ChevronRight size={14} />
        </Button>
      </CardFooter>
    </Card>
  );
}