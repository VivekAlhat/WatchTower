"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className="bg-gray-800 text-white rounded-md px-6 py-2 cursor-pointer hover:bg-gray-600"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      className="bg-gray-800 text-white rounded-md px-6 py-2 cursor-pointer hover:bg-gray-600"
      onClick={() => signIn("github", { callbackUrl: "/dashboard/monitoring" })}
    >
      Sign In
    </button>
  );
}
