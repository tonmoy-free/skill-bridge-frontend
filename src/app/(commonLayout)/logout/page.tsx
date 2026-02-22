"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutPage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out first so server-side session is cleared
            await authClient.signOut();

            // Show feedback and navigate to login page
            toast.success("User logged out");
            await router.push("/login");

            // Refresh server components to reflect new session state
            router.refresh();
        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
}