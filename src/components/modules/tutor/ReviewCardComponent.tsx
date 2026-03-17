// components/dashboard/tutor/ReviewCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.student.image} />
            <AvatarFallback>{review.student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{review.student.name}</h4>
              <span className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {/* Star Rating Display */}
            <div className="flex gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-2 italic">
              "{review.comment}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}