import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Briefcase, Mail } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllTutorProfile } from "@/actions/tutor.action";

// Demo Data matching your JSON structure
const featuredTeachers = [
    {
        id: "c2f209d7-4700-4564-b03c-322f1588d136",
        bio: "Experienced Math & Physics tutor specializing in O/A Levels.",
        hourlyFee: 500,
        experience: 5,
        rating: 4.8,
        user: {
            name: "Rahim Ahmed",
            image: "https://i.ibb.co.com/m59kNmbL/12.png",
            email: "rahim@test.com",
        },
    },
    {
        id: "a1b2c3d4-e5f6-4700-b03c-322f1588d999",
        bio: "English Literature graduate helping students master IELTS & TOEFL.",
        hourlyFee: 400,
        experience: 3,
        rating: 4.9,
        user: {
            name: "Sarah Jenkins",
            image: "https://i.ibb.co.com/4R5gFL0f/8.png",
            email: "sarah@test.com",
        },
    },
    {
        id: "z9y8x7w6-v5u4-4700-b03c-322f1588d888",
        bio: "Professional Software Engineer teaching Web Development & Python.",
        hourlyFee: 600,
        experience: 7,
        rating: 5.0,
        user: {
            name: "Tanvir Hossain",
            image: "https://i.ibb.co.com/zTtnGkgn/2.png",
            email: "tanvir@test.com",
        },
    },
];

export default async function FeaturedTeachers() {

    const allTutor = await getAllTutorProfile();
    console.log("all tutor....",allTutor.data)
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div className="max-w-2xl">
                        <Badge className="mb-3" variant="secondary">Top Rated</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Learn from our Featured Teachers
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Our expert tutors are hand-picked for their teaching skills and subject mastery.
                        </p>
                    </div>
                    {/* <Button asChild variant="outline" className="hidden md:flex">
                        <Link href="/teachers">View All Teachers</Link>
                    </Button> */}
                    <button className=" w-40 h-10  border-black border-2 rounded-md   text-[15px] font-bold cursor-pointer hover:bg-black hover:text-white   hover:text-[16px] transition-all duration-700  ease-in-out">
                        <Link href="/teachers">View All Teachers</Link>
                    </button>
                </div>

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                    {featuredTeachers.map((teacher) => (
                        <Card key={teacher.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                            <CardHeader className="p-0">
                                <div className="relative h-96 w-full bg-muted ">
                                    <Image
                                        src={teacher.user.image}
                                        alt={teacher.user.name}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className=" group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 text-black hover:bg-white flex gap-1 items-center border-none">
                                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                            {teacher.rating || "New"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-1">{teacher.user.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <Mail className="w-3 h-3 mr-1" /> {teacher.user.email}
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                    {teacher.bio}
                                </p>

                                <div className="flex items-center gap-4 py-3 border-y border-border">
                                    <div className="flex items-center text-sm font-medium">
                                        <Briefcase className="w-4 h-4 mr-1 text-primary" />
                                        {teacher.experience} yrs Exp.
                                    </div>
                                    <div className="flex items-center text-sm font-medium">
                                        <Clock className="w-4 h-4 mr-1 text-primary" />
                                        Tk {teacher.hourlyFee}/hr
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 flex gap-2">
                                {/* <Button asChild className="w-full">
                                    <Link href={`/teachers/${teacher.id}`}>View Profile</Link>
                                </Button>
                                <Button variant="outline" size="icon" className="shrink-0">
                                    <Link href={`mailto:${teacher.user.email}`}><Mail className="w-4 h-4" /></Link>
                                </Button> */}
                                <button className="w-full h-11  border-black border-2 rounded-md  text-[15px] font-bold cursor-pointer hover:bg-black hover:text-white  hover:text-[16px] transition-all duration-700  ease-in-out">
                                    <Link href={`/teachers/${teacher.id}`}>View Profile</Link>
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Mobile View More Button */}
                <div className="mt-10 flex justify-center md:hidden">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/teachers">View All Teachers</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
