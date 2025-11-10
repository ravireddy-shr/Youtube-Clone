import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/state/auth";
import { Link } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <AppLayout>
      {isAdmin ? (
        <div>
          <h1 className="text-2xl font-bold">Admin Upload Center</h1>
          <p className="mt-2 text-white/70">
            Only admins can upload. Connect storage/backend to enable real
            uploads.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <label className="text-sm text-white/80">Video file</label>
              <input
                type="file"
                className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 p-2 text-sm"
                disabled
              />
              <p className="mt-2 text-xs text-white/60">
                Demo only. Hook to backend to upload to storage (e.g.,
                S3/Supabase).
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <label className="text-sm text-white/80">Title</label>
              <input
                className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 p-2 text-sm"
                placeholder="Video title"
              />
              <label className="mt-4 text-sm text-white/80">Description</label>
              <textarea
                className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 p-2 text-sm h-28"
                placeholder="Describe your video"
              />
              <button
                className="mt-4 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-2 text-sm shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                disabled
              >
                Upload (disabled in demo)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold">Admins only</h1>
          <p className="mt-2 text-white/70">
            You must be signed in as admin to access uploads.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 rounded-full bg-white/10 px-4 py-2 text-sm border border-white/10"
          >
            Go back home
          </Link>
        </div>
      )}
    </AppLayout>
  );
}
