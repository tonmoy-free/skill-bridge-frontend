// import { LoginForm } from "@/components/modules/authentication/login-form"

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <LoginForm />
//       </div>
//     </div>
//   )
// }


"use client"; // এটি অবশ্যই থাকতে হবে

import { LoginForm } from "@/components/modules/authentication/login-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  // যদি URL-এ callbackUrl না থাকে, তবে ডিফল্ট হিসেবে ড্যাশবোর্ডে যাবে
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* আমরা callbackUrl-টি প্রপস হিসেবে পাঠাচ্ছি */}
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}

// Next.js-এ useSearchParams ব্যবহার করলে Suspense দিয়ে র‍্যাপ করা ভালো প্র্যাকটিস
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
