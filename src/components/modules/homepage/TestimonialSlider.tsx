"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Rahat Ahmed",
    role: "HSC Student",
    image: "https://i.ibb.co.com/m59kNmbL/12.png",
    content: "এই প্ল্যাটফর্ম থেকে আমি ফিজিক্সের সেরা টিউটর খুঁজে পেয়েছি। এখন কঠিন টপিকগুলোও পানির মতো সহজ মনে হয়!",
    rating: 5,
  },
  {
    name: "Sumaiya Akter",
    role: "Parent",
    image: "https://i.ibb.co.com/QvMvcLDP/13.png",
    content: "আমার মেয়ের ম্যাথ টিউটর খুবই দক্ষ। মাত্র ৩ মাসেই ওর রেজাল্টে অনেক উন্নতি হয়েছে। ধন্যবাদ SkillBridge!",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    role: "Admission Seeker",
    image: "https://i.ibb.co.com/S40MVGhZ/11.png",
    content: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার সময় এই প্ল্যাটফর্মের টিউটররা আমাকে দারুণভাবে গাইড করেছেন। খুবই নির্ভরযোগ্য।",
    rating: 4,
  },
  {
    name: "Anika Tabassum",
    role: "O-Level Student",
    image: "https://i.ibb.co.com/4R5gFL0f/8.png",
    content: "খুবই চমৎকার ইন্টারফেস! আমার পছন্দের সাবজেক্ট অনুযায়ী টিউটর ফিল্টার করে নেওয়া খুব সহজ ছিল।",
    rating: 5,
  },
];

export function TestimonialSlider() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            শিক্ষার্থী ও অভিভাবকদের মতামত
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            হাজারো শিক্ষার্থী তাদের স্বপ্নের টিউটর খুঁজে পেয়েছে আমাদের মাধ্যমে। দেখে নিন তাদের অভিজ্ঞতা।
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative max-w-5xl mx-auto px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-none shadow-sm dark:bg-slate-950">
                    <CardContent className="flex flex-col p-6 h-full justify-between">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < testimonial.rating 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-slate-300"
                              )}
                            />
                          ))}
                        </div>
                        
                        <p className="text-slate-700 dark:text-slate-300 italic mb-6">
                          "{testimonial.content}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className=" w-12 h-12 rounded-full overflow-hidden border">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-slate-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Buttons */}
            <CarouselPrevious className="hidden md:flex -left-4 hover:bg-primary hover:text-white" />
            <CarouselNext className="hidden md:flex -right-4 hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// Utility function (Shadcn-এ ডিফল্ট থাকে)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}