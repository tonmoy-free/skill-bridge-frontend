"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Assets & Components
import skillbridgeLight from "../../../public/Logo/skillbridgeLight.png";
import { ModeToggle } from "./ModeToggle";
import LogoutPage from "@/app/(commonLayout)/logout/page";

interface MenuItem {
  title: string;
  url: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface NavbarProps {
  className?: string;
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  session?: User;
}

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Find Tutor", url: "/tutors" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
  session,
}: NavbarProps) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 w-full overflow-x-hidden",
        className
      )}
    >
      {/* Using 'w-full' instead of 'w-screen' to prevent horizontal overflow.
          'mx-auto' keeps the content centered on large screens.
      */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* --- LEFT SIDE: Logo & Desktop Nav --- */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
              <Image
                src={skillbridgeLight}
                alt="skillbridge"
                priority
                className="w-28 md:w-36 h-auto dark:brightness-0 dark:invert"
              />
            </Link>

            <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.url}
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* --- RIGHT SIDE: Actions --- */}
          <div className="flex items-center gap-2">

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3">
              <ModeToggle />
              {session?.email ? (
                <>
                  <LogoutPage />
                  <div>{session?.email}</div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center gap-1 sm:gap-2">
              <ModeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>

                {/* Mobile Sheet constrained to right side without overflow */}
                <SheetContent side="right" className="w-[85%] sm:w-[350px] flex flex-col justify-between p-6">
                  <div className="flex flex-col">
                    <SheetHeader className="text-left border-b pb-4">
                      <SheetTitle>
                        <Image
                          src={skillbridgeLight}
                          alt="Logo"
                          className="w-24 h-auto dark:brightness-0 dark:invert"
                        />
                      </SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-col gap-2 mt-6">
                      {menu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="text-base font-medium transition-colors hover:text-primary py-3 border-b border-slate-100 dark:border-slate-800"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Login/Logout at bottom */}
                  <div className="border-t pt-6 flex flex-col gap-3">
                    {session?.email ? (
                      <div className="space-y-4">
                        <div className="px-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Account</p>
                          <p className="text-sm font-semibold truncate">{session.email}</p>
                        </div>
                        <LogoutPage />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" className="w-full">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export { Navbar };