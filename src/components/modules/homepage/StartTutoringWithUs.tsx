import Image from "next/image";
import globalTrademark from "../../../../public/globe.svg";
import Link from "next/link";

export default function StartTutoringWithUs() {
    return (
        // bg-amber-200 এর সাথে dark:bg-slate-900 যোগ করা হয়েছে
        <div className="bg-amber-200 dark:bg-slate-900 h-[540px] transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto flex justify-between items-center pt-22 md:pl-8 pl-5">

                {/* Left Content */}
                <div className="flex-1 space-y-5">
                    <h1 className="md:text-6xl text-[32px] w-3/4 font-bold pt-3 text-slate-900 dark:text-white">
                        Start tutoring with Us.
                    </h1>
                    <p className="text-2xl font-medium mt-4 w-3/4 text-slate-800 dark:text-slate-300">
                        We’re always looking for talented tutors. Set your own rate, get paid and make a difference.
                    </p>
                    <Link href={"/register"}>
                        <button className="w-40 h-10 border-black dark:border-white border-2 rounded-md md:text-[18px] text-[15px] font-bold cursor-pointer hover:bg-white dark:hover:bg-slate-800 dark:text-white dark:hover:text-white transition-all duration-500 ease-in-out">
                            Become a Tutor
                        </button>
                    </Link>
                </div>

                {/* Right Content / Images */}
                <div className="flex-1 hidden md:block">
                    <div className="relative">
                        {/* Main Image Card */}
                        <Image
                            src="https://i.ibb.co.com/m59kNmbL/12.png"
                            width={350}
                            height={300}
                            alt="tutor"
                            className="p-5 bg-white dark:bg-slate-800 rounded-md h-[360px] object-cover shadow-xl border dark:border-slate-700"
                        />

                        {/* Verified Users Floating Card */}
                        <div className="bg-white dark:bg-slate-800 w-[220px] h-[230px] absolute top-40 -left-20 rounded-md shadow-2xl border dark:border-slate-700">
                            <p className="p-5 font-semibold text-[18px] text-gray-700 dark:text-slate-200">
                                100% verified users
                            </p>
                            <div className="pl-5 space-y-3 pr-5">
                                {[
                                    { name: "Rahmi Khan", img: "https://i.ibb.co.com/m5DXmyfR/10.png" },
                                    { name: "Rimon Ali", img: "https://i.ibb.co.com/PzMXdCGC/7.png" },
                                    { name: "Zakir Nayak", img: "https://i.ibb.co.com/SwtfnY6N/1.png" }
                                ].map((user, index) => (
                                    <div key={index} className={`flex gap-3 justify-start items-center ${index === 0 ? 'border-t border-gray-200 dark:border-slate-700 pt-3' : ''}`}>
                                        <Image src={user.img} width={35} height={35} alt="user" className="rounded-full border dark:border-slate-600" />
                                        <p className="text-sm font-medium dark:text-slate-300">{user.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Background Decorative Icon */}
                        <div className="absolute -top-12 right-20 opacity-20 dark:opacity-40 invert dark:invert-0">
                            <Image src={globalTrademark} width={120} height={120} alt="globalTrademark" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}