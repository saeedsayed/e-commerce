"use server"
import { cookies } from "next/headers";

export const getTokenFromCookies = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
};