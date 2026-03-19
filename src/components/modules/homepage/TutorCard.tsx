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
import Image from "next/image"
import Link from "next/link"
import tutorImageDefault from "../../../../public/Image/defaultTutor.png"


export function TutorCard({ post }: { post: TutorProfile }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      {post.user?.image ? (
        <Image
          src={post.user.image}
          alt={post.user.name || "Tutor image"}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          width={400}
          height={225}
          priority
        />
      ) : (
        <Image
          src="https://avatar.vercel.sh/shadcn1"
          alt="Default avatar"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          width={400}
          height={225}
        />
      )}
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

// TutorCard.tsx

