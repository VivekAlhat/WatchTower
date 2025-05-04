import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getApiClient() {
  const session = await getServerSession(authOptions);
  const apiClient = axios.create({
    baseURL: process.env.WATCHTOWER_API_URL,
    headers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Authorization: `Bearer ${(session as any)?.accessToken || ""}`,
    },
  });

  return apiClient;
}
