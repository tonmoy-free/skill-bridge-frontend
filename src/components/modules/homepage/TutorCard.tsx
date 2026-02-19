// import { Badge } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TutorProfile } from "@/types"
import Link from "next/link"


export function TutorCard({ post }: { post: TutorProfile }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {/* {post.isFeatured && (
            <Badge
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Featured
            </Badge> */}
        </CardAction>
        <CardTitle>{post.user?.name}</CardTitle>
        <CardDescription>
          {post.bio}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Link href={`/tutors/${post.id}`}>
            See More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
