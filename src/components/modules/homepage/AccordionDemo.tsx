import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className=" container mx-auto"
        >
            <AccordionItem value="shipping">
                <AccordionTrigger>Q1: How can I find the right tutor for my needs?</AccordionTrigger>
                <AccordionContent>
                    A: You can use our search filters to find tutors by subject, class, location, or price range. Each tutor has a detailed profile with their qualifications, experience, and student reviews to help you decide.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Q2: Are the tutors on this platform verified?</AccordionTrigger>
                <AccordionContent>
                    A: Yes, we take security seriously. All our tutors go through a multi-step verification process, including NID/Identity check and academic document verification, to ensure they are qualified and trustworthy.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
                <AccordionTrigger>Q3: How do I book a session with a tutor?</AccordionTrigger>
                <AccordionContent>
                    A: Once you find a tutor you like, click the "Book a Session" or "Request for Tutor" button. You can choose your preferred time slots from the tutor’s availability calendar.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="s">
                <AccordionTrigger>Q4: Can I request a demo class before confirming?</AccordionTrigger>
                <AccordionContent>
                    A: Many of our tutors offer a free or discounted 20-minute demo session. Check the "Demo Available" badge on the tutor's profile.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="d">
                <AccordionTrigger>Q5: What happens if I am not satisfied with a tutor?</AccordionTrigger>
                <AccordionContent>
                    A: We have a "Tutor Love Guarantee." If you are not satisfied after the first session, let us know, and we will help you find a replacement or process a refund based on our policy.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
