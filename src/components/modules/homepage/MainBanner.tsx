"use client"
import Image from "next/image";
import homeBanner from "../../../../public/Image/homeBanner.png";
import teacher from "../../../../public/Image/Teacher.json";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import { FaArrowTrendUp } from "react-icons/fa6";
import Marquee from "react-fast-marquee";



export default function MainBanner() {
    return (
        <div className="bg-amber-200">
            <div className=" w-full  h-170 flex items-center justify-between container mx-auto">
                <div className=" flex-1 ">
                    <div>
                        <h1 className="text-5xl font-extrabold">The Nation's Largest <br /> Network for <br />  Tutors.</h1>
                        <h1 className="text-3xl font-bold pt-3 pb-3">
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
                        <p className="font-medium">Individualized, one-on-one instructional sessions with a highly qualified instructor of your selection. Meet online or in person.</p>
                    </div>
                    <div className="pt-3 pb-6 flex items-center justify-start gap-2">
                        <div>
                            <FaArrowTrendUp className="text-xl" />
                        </div>
                        <div className="flex justify-start items-center gap-2 ">
                            <p className="font-medium text-xl">Trending:</p>
                            <p className="w-[370px] overflow-hidden 
[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                                <Marquee speed={45}>
                                    <div className="flex gap-1.5">
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Accounting</p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">English</p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Bangla</p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Math</p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Arabic</p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Chemistry
                                        </p>
                                        <p className="pt-1 pb-1 pl-2 pr-2 text-[11px] font-medium bg-white rounded-full">Physics
                                        </p>
                                    </div>
                                </Marquee>
                            </p>
                        </div>
                    </div>
                    <div className="button flex gap-5 ">
                        <button className="w-67.5 h-15 border-black border-2 rounded-md text-2xl font-bold cursor-pointer hover:bg-white hover:text-[25px] transition-all duration-500  ease-in-out">Find Tutors</button>
                        <button className="w-67.5 h-15 border-black border-2 rounded-md text-2xl font-bold cursor-pointer hover:bg-white hover:text-[25px] transition-all duration-500  ease-in-out">Request For Tutors</button>
                    </div>
                </div>
                <div className=" flex-1">
                    <Lottie className='ml-55 hidden lg:block' style={{ width: '700px' }} animationData={teacher} loop={true}></Lottie>
                </div>

            </div>
        </div>
    )
}
{/* <Image
    src={homeBanner}
    alt="Banner"
    className="w-full "
/> */}