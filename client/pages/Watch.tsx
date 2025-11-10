import AppLayout from "@/components/layout/AppLayout";
import { useParams } from "react-router-dom";

export default function Watch() {
  const { id } = useParams();
  const src =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <AppLayout>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <section>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]">
            <video
              controls
              className="h-full w-full"
              src={src}
              poster="/placeholder.svg"
            />
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">
            Big Buck Bunny — Demo
          </h1>
          <div className="mt-2 text-sm text-white/70">
            1,234,567 views • Uploaded recently
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 cursor-not-allowed">
              <span className="mr-2">👍</span> Like (sign in)
            </button>
            <button className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 cursor-not-allowed">
              <span className="mr-2">💬</span> Comment (sign in)
            </button>
            <button className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 cursor-not-allowed">
              ➕ Add to playlist (sign in)
            </button>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="text-sm text-white/80">
              Admin-only uploads are enforced. Public users can watch videos
              without accounts; interactions require sign in.
            </div>
          </div>
        </section>
        <aside className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-40 aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5" />
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded bg-white/10 mb-2" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </AppLayout>
  );
}
