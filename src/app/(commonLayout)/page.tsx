import { TutorCard } from "@/components/modules/homepage/TutorCard";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { TutorProfile } from "@/types";
import skillbridgeLight from "../../../public/Logo/skillbridgeLight.png";
import Link from "next/link";
import Image from "next/image";
import MainBanner from "@/components/modules/homepage/MainBanner";



export default async function Home() {
  const { data } = await blogService.getBlogPosts({
    isFeatured: true,
    search: "",
  },
    {
      // cache: "no-store"
      revalidate: 10,
    });

  //  const { data:login } = await userService.getSession();

  // console.log("Home page",login.user.email)
  console.log(data)
  return (
    <div>
      <div >
        <MainBanner></MainBanner>
      </div>
      <div>
        <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
          {data?.map((post: TutorProfile) => (
            <TutorCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
}
