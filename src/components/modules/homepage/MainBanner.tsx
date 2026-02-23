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
            <div className=" w-full  h-170 flex items-center justify-between container mx-auto pl-4 ">
                <div className=" flex-1 md:w-full w-[40%]">
                    <div>
                        <h1 className="md:text-5xl font-extrabold text-3xl">The Nation's Largest <br /> Network for <br />  Tutors.</h1>
                        <h1 className="md:text-3xl font-bold pt-3 pb-3 text-xl">
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
                        <p className="font-medium md:w-full w-[80%]">Individualized, one-on-one instructional sessions with a highly qualified instructor of your selection. Meet online or in person.</p>
                    </div>
                    <div className="pt-3 pb-6 flex items-center justify-start gap-2">
                        <div>
                            <FaArrowTrendUp className="text-xl" />
                        </div>
                        <div className="flex justify-start items-center gap-2 md:w-full w-[80%]">
                            <p className="font-medium text-xl bor">Trending:</p>
                            <div className="md:w-[370px]   overflow-hidden 
[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ">
                                <Marquee speed={45} >
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
                            </div>
                        </div>
                    </div>
                    <div className="button flex gap-5 ">
                        <button className="md:w-67.5 w-40 h-10 md:h-15 border-black border-2 rounded-md md:text-2xl text-[15px] font-bold cursor-pointer hover:bg-white md:hover:text-[25px] hover:text-[16px] transition-all duration-500  ease-in-out">Find Tutors</button>
                        <button className="md:w-67.5 w-40 h-10 md:h-15 border-black border-2 rounded-md md:text-2xl text-[15px] font-bold cursor-pointer hover:bg-white md:hover:text-[25px] hover:text-[16px] transition-all duration-500  ease-in-out">Request For Tutors</button>
                    </div>
                </div>
                <div className=" flex-1 hidden lg:block">
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