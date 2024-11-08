import { auth } from "../src/server/auth"

// Read more: https://next-auth.js.org/configuration/nextjs#middleware
export default auth((req) => {
  // req.auth
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}