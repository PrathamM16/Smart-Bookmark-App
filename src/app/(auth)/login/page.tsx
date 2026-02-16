import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔖</div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Bookmarks</h1>
          <p className="text-sm text-gray-500 mt-2">
            Save and organize your favorite links
          </p>
        </div>
        <GoogleSignInButton />
        <p className="text-xs text-center text-gray-400 mt-5">
          We only use Google to verify your identity.
        </p>
      </div>
    </main>
  );
}