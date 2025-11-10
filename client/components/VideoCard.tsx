import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail?: string;
};

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      to={`/watch/${video.id}`}
      className={cn(
        "group block rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow",
      )}
      style={{ perspective: 1000 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/20" />
        <div className="absolute right-2 bottom-2 z-10 text-[11px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-white">
          {video.duration}
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-16 w-16 rounded-full bg-red-600/80 border border-red-400/30 shadow-[0_0_35px_rgba(239,68,68,0.6)] grid place-items-center scale-90 group-hover:scale-100 transition-transform">
            <div className="ml-0.5 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0.02)_60%,transparent_100%)] opacity-70 mix-blend-overlay" />
        <img
          src={video.thumbnail ?? "placeholder.svg"}
          alt={video.title}
          className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white/90 line-clamp-2 group-hover:text-white">
          {video.title}
        </h3>
        <div className="mt-2 text-xs text-white/60 flex gap-2">
          <span className="hover:text-white/80 transition-colors">
            {video.channel}
          </span>
          <span>•</span>
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.timestamp}</span>
        </div>
      </div>
    </Link>
  );
}
