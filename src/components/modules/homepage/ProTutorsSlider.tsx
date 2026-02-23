"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info, MapPin, UserPlus, GraduationCap, Trophy, Crown } from "lucide-react";

// Demo Data matching the image style
const proTutors = [
    {
        id: 1,
        name: "sudip B.",
        university: "IUB",
        department: "CSE",
        experience: "12 Year Experienced",
        monthlyFee: "22,000",
        location: "Dhanmondi, Dha...",
        subjects: ["Additional Maths", "Chemistry", "Physics"],
        image: "https://i.ibb.co.com/m59kNmbL/12.png", // Replace with actual image path
        isVerified: true,
        rating: 10,
        isPro: true
    },
    {
        id: 2,
        name: "Ahonaf T.",
        university: "United International University",
        department: "Managerial Finance & Fintech",
        experience: "3 Year Experienced",
        monthlyFee: "6,000",
        location: "Mirpur, Dhaka",
        subjects: ["English", "Management", "Bangladesh an"],
        image: "https://i.ibb.co.com/m59kNmbL/12.png", // Replace with actual image path
        isVerified: true,
        rating: null,
        isPro: true
    },
    {
        id: 3,
        name: "Tonmoy Khan.",
        university: "United International University",
        department: "Managerial Finance & Fintech",
        experience: "3 Year Experienced",
        monthlyFee: "6,000",
        location: "Mirpur, Dhaka",
        subjects: ["English", "Management", "Bangladesh an"],
        image: "https://i.ibb.co.com/m59kNmbL/12.png", // Replace with actual image path
        isVerified: true,
        rating: null,
        isPro: true
    },
    {
        id: 4,
        name: "Azharul Islam Bhuiyan",
        university: "United International University",
        department: "Managerial Finance & Fintech",
        experience: "3 Year Experienced",
        monthlyFee: "6,000",
        location: "Mirpur, Dhaka",
        subjects: ["English", "Management", "Bangladesh an"],
        image: "https://i.ibb.co.com/m59kNmbL/12.png", // Replace with actual image path
        isVerified: true,
        rating: null,
        isPro: true
    },
    {
        id: 5,
        name: "Fihan Khan",
        university: "United International University",
        department: "Managerial Finance & Fintech",
        experience: "3 Year Experienced",
        monthlyFee: "6,000",
        location: "Mirpur, Dhaka",
        subjects: ["English", "Management", "Bangladesh an"],
        image: "https://i.ibb.co.com/m59kNmbL/12.png", // Replace with actual image path
        isVerified: true,
        rating: 5,
        isPro: true
    },
    // Add more items to see the sliding effect
];

export default function ProTutorsSlider() {
    const [api, setApi] = React.useState<CarouselApi>();

    return (
        <section className="py-12 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">

                {/* Header with Navigation Buttons */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Our Pro Tutors</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">These are some of our Elite Tutors!</p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 border-none text-black h-14 w-14 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            onClick={() => api?.scrollPrev()}
                        >
                            <span className="text-3xl font-extrabold">‹</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 border-none text-black h-14 w-14 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            onClick={() => api?.scrollNext()}
                        >
                            <span className="text-3xl font-bold">›</span>
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel
                    setApi={setApi}
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {proTutors.map((tutor) => (
                            <CarouselItem key={tutor.id} className="pl-4 md:basis-1/2 lg:basis-[48%]">
                                <Card className="border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row gap-6">

                                            {/* Left Side: Profile Image and Primary Buttons */}
                                            <div className="flex flex-col gap-4 items-center sm:items-start shrink-0">
                                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100">
                                                    <Image src={tutor.image} alt={tutor.name} fill priority sizes="128px" className="object-cover" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="bg-yellow-200 hover:bg-yellow-300 text-black border-2 border-black rounded-lg px-6 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        View
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="border-2 border-black rounded-lg px-4 font-bold flex gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        Request <UserPlus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Right Side: Details */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-wrap items-center gap-2 justify-between">
                                                    <Badge className="bg-yellow-100 text-slate-900 hover:bg-yellow-100 border-none rounded-md px-3 py-1 font-bold">
                                                        {tutor.experience}
                                                    </Badge>
                                                    <div className="p-1 border rounded-md bg-slate-50">
                                                        <GraduationCap className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{tutor.name}</h3>
                                                    {tutor.isVerified && <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400 text-white" />}
                                                    {tutor.rating && (
                                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                                                            <Trophy className="w-3 h-3 text-yellow-600" />
                                                            <span className="text-xs font-bold">{tutor.rating}</span>
                                                        </div>
                                                    )}
                                                    {tutor.isPro && (
                                                        <Badge className="bg-yellow-400 hover:bg-yellow-400 text-black border-none flex gap-1 px-2 py-0.5 font-bold">
                                                            <Crown className="w-3 h-3" /> Pro
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="text-sm text-slate-600 dark:text-slate-400 space-y-0.5">
                                                    <p className="font-medium text-slate-800 dark:text-slate-200">{tutor.university}</p>
                                                    <p><span className="font-bold">Department:</span> {tutor.department}</p>
                                                </div>

                                                <div className="flex items-center justify-between py-1">
                                                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                                                        <span>৳ {tutor.monthlyFee}/Month</span>
                                                        <Info className="w-3 h-3 fill-yellow-400 text-white" />
                                                    </div>
                                                    <div className="flex items-center gap-1 text-slate-900 dark:text-slate-100 text-sm font-bold">
                                                        <MapPin className="w-4 h-4" />
                                                        {tutor.location}
                                                    </div>
                                                </div>

                                                {/* Subject Badges */}
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {tutor.subjects.map((sub) => (
                                                        <Badge key={sub} variant="outline" className="rounded-full px-4 py-1 text-slate-500 font-normal border-slate-300">
                                                            {sub}
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
        </section>
    );
}