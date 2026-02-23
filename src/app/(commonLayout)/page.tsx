import { TutorCard } from "@/components/modules/homepage/TutorCard";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { TutorProfile } from "@/types";
import skillbridgeLight from "../../../public/Logo/skillbridgeLight.png";
import Link from "next/link";
import Image from "next/image";
import MainBanner from "@/components/modules/homepage/MainBanner";
import { Footer2 } from "@/components/modules/homepage/Footer";
import Accordion from "@/components/modules/homepage/Accordion";
import { AccordionDemo } from "@/components/modules/homepage/AccordionDemo";
import Faq from "@/components/modules/homepage/Faq";
import TutorYouWillLove from "@/components/modules/homepage/TutorYouWillLove";
import StartTutoringWithUs from "@/components/modules/homepage/StartTutoringWithUs";
import { TestimonialSlider } from "@/components/modules/homepage/TestimonialSlider";
import FeaturedTeachers from "@/components/modules/homepage/FeaturedTeachers";
import ProTutorsSlider from "@/components/modules/homepage/ProTutorsSlider";



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
        <FeaturedTeachers />
      </div>
      <div>
        <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
          {data?.map((post: TutorProfile) => (
            <TutorCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div>
        <StartTutoringWithUs />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <TutorYouWillLove />
      </div>
      <div>
        <TestimonialSlider />
      </div>
      <div>
        <ProTutorsSlider />
      </div>
      <div>
        <Footer2 />
      </div>

    </div>
  );
}
