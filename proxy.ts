export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
