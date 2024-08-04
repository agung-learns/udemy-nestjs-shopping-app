import {NextRequest} from "next/server";

const unauthorizedRoutes = ["/auth/login", "/auth/signup"];

export const middleware = (request: NextRequest) => {
    const auth = request.cookies.get("Authentication")?.value;
    if (!auth && !unauthorizedRoutes.some(route => route === request.nextUrl.pathname.startsWith(route))) {
        return Response.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}