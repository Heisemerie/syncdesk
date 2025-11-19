export { auth as proxy } from "@/auth.config";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
