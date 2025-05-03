import AuthButton from "@/components/auth-button";

export default function Login() {
  return (
    <div className="grid place-content-center h-screen text-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">WatchTower</h1>
        <p className="text-gray-700">
          Simple, fast, and modern uptime monitoring for your apps and sites
        </p>
        <AuthButton />
      </main>
    </div>
  );
}
