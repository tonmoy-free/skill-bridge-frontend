"use client"
import Image from "next/image";
import homeBanner from "../../../../public/Image/homeBanner.png";
import teacher from "../../../../public/Image/Teacher.json";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import { FaArrowTrendUp } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import verifiedTutorIcon from "../.././../../public/Image/verifiedTutorIcon.png";
import tutionIcon from "../.././../../public/Image/tutionIcon.png";
import tutionMatched from "../.././../../public/Image/tutionMatched.png";



// export default function MainBanner() {
//     return (
//         <div className="bg-amber-200">
//             <div className="relative w-full  h-170 flex items-center justify-between container mx-auto pl-4 ">
//                 <div className=" flex-1 md:w-full w-[40%]">
//                     <div>
//                         <h1 className="md:text-5xl font-extrabold text-3xl">The Nation's Largest <br /> Network for <br />  Tutors.</h1>
//                         <h1 className="md:text-3xl font-bold pt-3 pb-3 text-xl">
//                             <Typewriter
//                                 options={{
//                                     strings: [
//                                         "Find the Perfect Tutor for You",
//                                         "Learn from Expert Tutors",
//                                         "Unlock Your Academic Potential..."
//                                     ],
//                                     autoStart: true,
//                                     loop: true,
//                                     delay: 50,
//                                 }}
//                             />
//                         </h1>
//                         <p className="font-medium md:w-full w-[80%]">Individualized, one-on-one instructional sessions with a highly qualified instructor of your selection. Meet online or in person.</p>
//                     </div>
//                     <div className="pt-3 pb-6 flex items-center justify-start gap-2">
//                         <div>
//                             <FaArrowTrendUp className="text-xl" />
//                         </div>
//                         <div className="flex justify-start items-center gap-2 md:w-full w-[80%]">
//                             <p className="font-medium text-xl bor">Trending:</p>
//                             <div className="md:w-[370px]   overflow-hidden 
// [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ">
//                                 <Marquee speed={45} >
//                                     <div className="flex gap-1.5">
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Accounting</p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">English</p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Bangla</p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Math</p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Arabic</p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Chemistry
//                                         </p>
//                                         <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Physics
//                                         </p>
//                                     </div>
//                                 </Marquee>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="button flex gap-5 ">
//                         <button className="md:w-67.5 w-40 h-10 md:h-15 border-black border-2 rounded-md md:text-2xl text-[15px] font-bold cursor-pointer hover:bg-white md:hover:text-[25px] hover:text-[16px] transition-all duration-500  ease-in-out">Find Tutors</button>
//                         <button className="md:w-67.5 w-40 h-10 md:h-15 border-black border-2 rounded-md md:text-2xl text-[15px] font-bold cursor-pointer hover:bg-white md:hover:text-[25px] hover:text-[16px] transition-all duration-500  ease-in-out">Request For Tutors</button>
//                     </div>
//                 </div>
//                 <div className=" flex-1 hidden lg:block">
//                     <Lottie className='ml-55 hidden lg:block' style={{ width: '700px' }} animationData={teacher} loop={true}></Lottie>
//                 </div>

//                 <div className="absolute hidden -bottom-13 left-50 right-0 w-full overflow-hidden md:flex items-center justify-start gap-10">
//                     <div className="bg-[#e3ffe9] cursor-pointer dark:bg-slate-900 p-4 w-[340px] h-[112px] border-2 rounded-xl flex items-center justify-center gap-5">
//                         <div>
//                             <Image
//                                 src={verifiedTutorIcon}
//                                 alt="1"
//                                 width={60}
//                                 height={60}
//                                 className="object-cover"
//                             />
//                         </div>
//                         <div>
//                             <p className="text-slate-900 text-2xl dark:text-white font-bold">Tutor</p>
//                             <p className="text-slate-900 dark:text-white font-medium">32.2K Verified Tutors</p>
//                         </div>
//                     </div>

//                     <div className="bg-[#deedff] cursor-pointer dark:bg-slate-900 p-4 w-[340px] h-[112px] border-2 rounded-xl flex items-center justify-center gap-5">
//                         <div>
//                             <Image
//                                 src={tutionIcon}
//                                 alt="1"
//                                 width={60}
//                                 height={60}
//                                 className="object-cover"
//                             />
//                         </div>
//                         <div>
//                             <p className="text-slate-900 text-2xl dark:text-white font-bold">Tuitions</p>
//                             <p className="text-slate-900 dark:text-white font-medium">24/7 Available Tution</p>
//                         </div>
//                     </div>

//                     <div className="bg-[#fbf7c6] cursor-pointer dark:bg-slate-900 p-4 w-[340px] h-[112px] border-2 rounded-xl flex items-center justify-center gap-5">
//                         <div>
//                             <Image
//                                 src={tutionMatched}
//                                 alt="1"
//                                 width={60}
//                                 height={60}
//                                 className="object-cover"
//                             />
//                         </div>
//                         <div>
//                             <p className="text-slate-900 text-2xl dark:text-white font-bold">Tutions Matched</p>
//                             <p className="text-slate-900 dark:text-white font-medium">2,076 Tution Confirmed.</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }
{/* <Image
    src={homeBanner}
    alt="Banner"
    className="w-full "
/> */}



export default function MainBanner() {
    return (
        // bg-amber-200 এর সাথে dark:bg-slate-950 যোগ করা হয়েছে
        <div className="bg-amber-200 dark:bg-slate-950 transition-colors duration-300">
            <div className="relative w-full h-170 flex items-center justify-between container mx-auto pl-4">
                <div className="flex-1 md:w-full w-[40%]">
                    <div>
                        {/* টেক্সট কালার ডার্ক মোডে সাদা হবে */}
                        <h1 className="md:text-5xl font-extrabold text-3xl text-slate-900 dark:text-white">
                            The Nation's Largest <br /> Network for <br /> Tutors.
                        </h1>
                        <h1 className="md:text-3xl font-bold pt-3 pb-3 text-xl text-slate-800 dark:text-amber-400">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Find the Perfect Tutor for You",
                                        "Learn from Expert Tutors",
                                        "Unlock Your Academic Potential..."
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                }}
                            />
                        </h1>
                        <p className="font-medium md:w-full w-[80%] text-slate-700 dark:text-slate-300">
                            Individualized, one-on-one instructional sessions with a highly qualified instructor of your selection. Meet online or in person.
                        </p>
                    </div>

                    {/* Trending Section */}
                    <div className="pt-3 pb-6 flex items-center justify-start gap-2 text-slate-900 dark:text-slate-200">
                        <FaArrowTrendUp className="text-xl" />
                        <div className="flex justify-start items-center gap-2 md:w-full w-[80%]">
                            <p className="font-medium text-xl">Trending:</p>
                            <div className="md:w-[370px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                                <Marquee speed={45}>
                                    <div className="flex gap-1.5">
                                        {/* মারকুই আইটেমগুলোকে ডার্ক মোডে আলাদা কালার দেওয়া হয়েছে */}
                                        {["Accounting", "English", "Bangla", "Math", "Arabic", "Chemistry", "Physics"].map((sub) => (
                                            <p key={sub} className="pt-1 pb-1 px-3 text-[11px] font-medium bg-white dark:bg-slate-800 dark:text-white rounded-full border border-transparent dark:border-slate-700">
                                                {sub}
                                            </p>
                                        ))}
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="button flex gap-5">
                        <button className="md:w-64 w-40 h-10 md:h-14 border-black dark:border-white border-2 rounded-md md:text-xl text-[14px] font-bold cursor-pointer hover:bg-white dark:hover:bg-slate-100 dark:hover:text-black dark:text-white transition-all duration-300">
                            Find Tutors
                        </button>
                        <button className="md:w-64 w-40 h-10 md:h-14 border-black dark:border-white border-2 rounded-md md:text-xl text-[14px] font-bold cursor-pointer hover:bg-white dark:hover:bg-slate-100 dark:hover:text-black dark:text-white transition-all duration-300">
                            Request For Tutors
                        </button>
                    </div>
                </div>

                {/* Lottie Animation - ডার্ক মোডে একটু অপাসিটি কমানো যেতে পারে যদি খুব উজ্জ্বল লাগে */}
                <div className="flex-1 hidden lg:block dark:opacity-90">
                    <Lottie className='ml-40' style={{ width: '600px' }} animationData={teacher} loop={true} />
                </div>

                {/* Bottom Info Cards - ইতিমধ্যে আপনার কোডে dark:bg-slate-900 আছে, আমি শুধু বর্ডারগুলো অ্যাডজাস্ট করে দিচ্ছি */}
                <div className="absolute hidden -bottom-13 left-0 right-0 w-full overflow-hidden md:flex items-center justify-center gap-6">
                    <InfoCard 
                        bg="bg-[#e3ffe9]" 
                        icon={verifiedTutorIcon} 
                        title="Tutor" 
                        desc="32.2K Verified Tutors" 
                    />
                    <InfoCard 
                        bg="bg-[#deedff]" 
                        icon={tutionIcon} 
                        title="Tuitions" 
                        desc="24/7 Available Tuition" 
                    />
                    <InfoCard 
                        bg="bg-[#fbf7c6]" 
                        icon={tutionMatched} 
                        title="Tuitions Matched" 
                        desc="2,076 Tuition Confirmed" 
                    />
                </div>
            </div>
        </div>
    );
}

// আলাদা কার্ড কম্পোনেন্ট (কোড ক্লিন রাখার জন্য)
function InfoCard({ bg, icon, title, desc }: any) {
    return (
        <div className={`${bg} dark:bg-slate-900 p-4 w-[300px] h-[100px] border-2 border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all`}>
            <Image src={icon} alt={title} width={50} height={50} className="object-contain" />
            <div>
                <p className="text-slate-900 dark:text-white text-xl font-bold">{title}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{desc}</p>
            </div>
        </div>
    );
}