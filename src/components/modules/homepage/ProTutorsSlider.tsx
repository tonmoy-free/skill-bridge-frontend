"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info, MapPin, UserPlus, GraduationCap, Trophy, Crown } from "lucide-react";
import photo from "../../../../public/Image/defaultTutor.png";
import Link from "next/link";

// এই কম্পোনেন্টটি এখন Props হিসেবে ডাটা রিসিভ করবে
export default function ProTutorsSlider({ tutors }: { tutors: any[] }) {
    const [api, setApi] = React.useState<CarouselApi>();

    // শুধুমাত্র প্রথম ৪টি ডাটা ম্যাপ করা হচ্ছে
    const featuredTutors = tutors.slice(0, 4);

    return (
        <section className="py-12 bg-white dark:bg-slate-950 mt-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Our Pro Tutors</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Elite Tutors selected for you!</p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black h-12 w-12 shadow-md"
                            onClick={() => api?.scrollPrev()}
                        >
                            <span className="text-2xl">‹</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black h-12 w-12 shadow-md"
                            onClick={() => api?.scrollNext()}
                        >
                            <span className="text-2xl">›</span>
                        </Button>
                    </div>
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {featuredTutors.map((tutor) => (
                            <CarouselItem key={tutor.id} className="pl-4 md:basis-1/2 lg:basis-[48%]">
                                <Card className="border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Profile Side */}
                                            <div className="flex flex-col gap-4 items-center sm:items-start shrink-0">
                                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100">
                                                    <Image
                                                        src={tutor.user?.image || photo}
                                                        alt={tutor.user?.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {/* <div className="flex gap-2">
                                                    <Link href={`/tutors/${tutor.id}`} >
                                                        <Button size="sm" className="bg-yellow-200 text-black border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Button size="sm" variant="outline" className="border-2 border-black rounded-lg font-bold flex gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        Request <UserPlus className="w-4 h-4" />
                                                    </Button>
                                                </div> */}
                                            </div>

                                            {/* Details Side */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Badge className="bg-yellow-100 text-slate-900 border-none font-bold">
                                                        {tutor.experience} Years Exp.
                                                    </Badge>
                                                    <Crown className="w-5 h-5 text-yellow-500" />
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-2xl font-bold capitalize">{tutor.user?.name}</h3>
                                                    <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400 text-white" />
                                                </div>

                                                <div className="text-sm space-y-1">
                                                    <p className="font-medium">{tutor.bio?.substring(0, 60)}...</p>
                                                    <p className="text-muted-foreground">Rate: ৳ {tutor.hourlyFee}/hr</p>
                                                </div>

                                                <div className="flex items-center gap-1 text-sm font-bold pt-2">
                                                    <MapPin className="w-4 h-4 text-red-500" />
                                                    {tutor.location || "Dhaka, Bangladesh"}
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {tutor.categories?.slice(0, 3).map((cat: any) => (
                                                        <Badge key={cat.id} variant="outline" className="rounded-full px-3 py-1 text-xs">
                                                            {cat.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            {/* Mobile View More Button */}
            <div className="mt-10 flex justify-center">
                <Button asChild variant="outline" className="">
                    <Link href="/tutors">View All Teachers</Link>
                </Button>
            </div>
        </section>
    );
}