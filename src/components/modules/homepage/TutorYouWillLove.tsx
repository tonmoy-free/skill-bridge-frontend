export default function TutorYouWillLove() {
    return (
        // ডার্ক মোডে ব্যাকগ্রাউন্ড ডার্ক ব্লু/ব্ল্যাক করার জন্য dark:bg-slate-950
        <div className="bg-amber-200 dark:bg-slate-950 h-[260px] transition-colors duration-300 flex items-center">
            <div className="container mx-auto px-4">
                <h1 className="md:text-6xl text-3xl font-bold text-center text-slate-900 dark:text-white">
                    Tutor you will love. Guaranteed.
                </h1>
                <p className="text-center md:text-xl text-[17px] mt-4 text-slate-800 dark:text-slate-300">
                    We match you with the perfect tutor based on your learning needs and preferences.
                </p>
            </div>
        </div>
    )
}