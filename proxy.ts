export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/issues/new", "/issues/:id+/edit"],
};