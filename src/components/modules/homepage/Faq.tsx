import Image from "next/image";
import faqImage from "../../../../public/Image/faq.gif";
import { AccordionDemo } from "./AccordionDemo";
export default function Faq() {

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Image src={faqImage} alt="FAQ Image" width={400} className=" h-auto" />
                </div>
                <div className="w-full md:w-1/2 px-5 md:px-0">
                    <h2 className="text-3xl font-bold mb-4 ">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-6">Find answers to common questions about our platform and services.</p>
                    <AccordionDemo />
                </div>
            </div>
        </div>
    )
}