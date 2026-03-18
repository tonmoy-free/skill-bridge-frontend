"use client"

import Lottie from "lottie-react";
// আপনার কাছে যদি কোনো নির্দিষ্ট JSON ফাইল থাকে সেটি ইম্পোর্ট করুন 
// অথবা নিচের মতো একটি অনলাইন URL বা সরাসরি ডাটা ব্যবহার করতে পারেন।
import loadingAnimation from "../../../public/Image/loading.json"; 

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true} 
          className="w-full h-full"
        />
      </div>
      
      {/* লোডিং টেক্সট উইথ অ্যানিমেশন */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white animate-pulse">
          Loading Tutors...
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Finding the best mentors for your journey
        </p>
      </div>

      {/* নিচের ছোট স্পিনারটি অপশনাল, লুক আরও প্রফেশনাল করে */}
      <div className="mt-8 flex gap-1">
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  )
}