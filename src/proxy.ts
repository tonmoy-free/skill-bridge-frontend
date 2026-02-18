import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname

    let isAuthenticated = false;
    let isAdmin = false;

    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
    }

    //user not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    //user is authenticated AND role = ADMIN
    //user can not visit user dashboard
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    //user is authenticated AND role = USER
    //user can not visit admin-dashboard
    if (!isAdmin && pathname.startsWith("admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log("chika pika rika ina mina dika", pathname, isAdmin)
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",  // "dashboard ar por sokol logic path asbe"
        "/admin-dashboard",
        "/admin-dashboard/:path*",  //"admin-dashboard ar por sokol logic path asbe"
    ],
}