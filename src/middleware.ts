import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    let sessionId = request.cookies.get("sessionId")?.value;

    if (!sessionId) {
        sessionId = crypto.randomUUID();

        response.cookies.set("sessionId", sessionId, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
        });
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};