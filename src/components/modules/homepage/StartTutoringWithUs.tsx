import Image from "next/image";
import globalTrademark from "../../../../public/globe.svg";

export default function StartTutoringWithUs() {
    return (
        <div className="bg-amber-200 h-[540px]">
            <div className="container mx-auto flex justify-between items-center pt-22 md:pl-8 pl-5">
                <div className="flex-1  space-y-5 ">
                    <h1 className="md:text-6xl text-[32px] w-3/4 font-bold  pt-3">Start tutoring with Us.</h1>
                    <p className=" text-2xl font-medium mt-4 w-3/4">We’re always looking for talented tutors. Set your own rate, get paid and make a difference.</p>
                    <button className=" w-40 h-10  border-black border-2 rounded-md md:text-[18px]  text-[15px] font-bold cursor-pointer hover:bg-white md:hover:text-[19px]  hover:text-[16px] transition-all duration-500  ease-in-out">Become a Tutor</button>
                </div>

                <div className="flex-1 hidden md:block ">
                    <div className="relative">
                        <Image src="https://i.ibb.co.com/m59kNmbL/12.png" width={350} height={300} alt="logo" className="p-5 bg-white rounded-md h-[360px]" />
                        <div className="bg-white w-[200px] h-[230px] absolute top-50 right-162 rounded-md ">
                            <p className=" p-5 font-semibold text-[18px] text-gray-700">100% verified users</p>
                            <div className="pl-5 space-y-2 pr-5">
                                <div className="flex gap-2 justify-start items-center border-t border-gray-300 pt-3">
                                    <div>
                                        <Image src="https://i.ibb.co.com/m59kNmbL/12.png" width={35} height={35} alt="logo" className="rounded-full" />
                                    </div>
                                    <div>
                                        <p>Rahmi Khan</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-start items-center">
                                    <div>
                                        <Image src="https://i.ibb.co.com/m59kNmbL/12.png" width={35} height={35} alt="logo" className="rounded-full" />
                                    </div>
                                    <div>
                                        <p>Rimon ALi</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-start items-center">
                                    <div>
                                        <Image src="https://i.ibb.co.com/m59kNmbL/12.png" width={35} height={35} alt="logo" className="rounded-full" />
                                    </div>
                                    <div>
                                        <p>Zakir Nayak</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-9 right-96 opacity-40">
                            <Image src={globalTrademark} width={90} height={90} alt="globalTrademark" className="" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}