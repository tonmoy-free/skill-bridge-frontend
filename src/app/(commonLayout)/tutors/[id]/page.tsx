import TutorProfileView from "@/components/commonLayout/TutorProfileView";

export default function TutorProfileSinglePage() {
    const exampleTutorProfile = {
        id: "prof_7890123456",
        userId: "mjG25tnAY8KR6bi4KfFtUq54MYtkU6kI",
        bio: "Hi there! I'm Tonmoy, a Senior Software Engineer with over 8 years of experience in Full-Stack Development. \n\nI specialize in helping students master React, Node.js, and Database design. My teaching philosophy is project-based; we won't just look at code, we'll build real-world applications together. \n\nWhether you are a beginner looking to start your journey or an advanced developer mastering system architecture, I'm here to guide you!",
        hourlyFee: 45.00,
        monthlyFee: 650.00,
        experience: 8,
        rating: 4.9,
        createdAt: "2026-03-02T09:40:36.739Z",
        updatedAt: "2026-03-04T12:20:00.000Z",

        // Relation: User
        user: {
            id: "mjG25tnAY8KR6bi4KfFtUq54MYtkU6kI",
            name: "Tonmoy Khan",
            email: "tonmoykhan.free@gmail.com",
            emailVerified: true,
            image: "https://github.com/shadcn.png", // Using a placeholder for UI testing
            role: "TUTOR", // Note: Role changed to TUTOR for this context
            phone: "+880 1712-345678",
            status: "ACTIVE",
        },

        // Relation: Category[]
        categories: [
            { id: "cat_1", name: "Web Development" },
            { id: "cat_2", name: "Computer Science" },
            { id: "cat_3", name: "System Design" },
        ],

        // Relation: Availability[]
        availability: [
            { id: "av_1", day: "Monday", startTime: "09:00", endTime: "17:00" },
            { id: "av_2", day: "Wednesday", startTime: "10:00", endTime: "14:00" },
        ],

        // Relation: Review[]
        reviews: [
            {
                id: "rev_1",
                rating: 5,
                comment: "Excellent tutor! Helped me understand Prisma and PostgreSQL in just two sessions.",
                createdAt: "2026-03-04T15:00:00.000Z",
                user: { name: "Alice Johnson" } // Assuming Review model includes reviewer name
            },
            {
                id: "rev_2",
                rating: 4.8,
                comment: "Very patient and clear explanations.",
                createdAt: "2026-03-01T10:00:00.000Z",
                user: { name: "Bob Smith" }
            }
        ]
    };
    return (
        <TutorProfileView profile={exampleTutorProfile} />
    )
}