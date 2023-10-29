import { NextResponse } from "next/server";
/* import { verify } from "jsonwebtoken"; */
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  //console.log("middleware")
  //console.log(request.nextUrl);
  //request.nextUrl.pathname.includes("/dashboard"));
  let cookie = request.cookies.get("myTokenName");
  if (cookie === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    /**verify da error en el middleware asi que hay que usar un middleware
       * error: The edge runtime does not support Node.js 'crypto' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime
       */
    /* const user = verify(cookie.value, process.env.API_SECRET); */
    const { payload } = await jwtVerify(cookie.value, new TextEncoder().encode(process.env.API_SECRET));
    console.log(payload);

    //return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/about/:path*", "/dashboard/:path*"],
};
