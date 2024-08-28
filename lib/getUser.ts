import { auth } from "@/auth";
export async function getUser() {
    const session = await auth()
    return session?.user
}
