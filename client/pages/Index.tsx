import AppLayout from "@/components/layout/AppLayout";
import VideoCard, { type Video } from "@/components/VideoCard";

const videos: Video[] = [
  {
    id: "1",
    title: "Mastering Glassmorphism UI in React + Tailwind",
    channel: "DesignLab",
    views: "1.2M",
    timestamp: "2 days ago",
    duration: "12:34",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Cinematic Drone Footage in 4K - Mountains at Dawn",
    channel: "AeroVision",
    views: "854K",
    timestamp: "1 week ago",
    duration: "08:21",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Build a Modern 3D Landing Page with CSS only",
    channel: "CodeCanvas",
    views: "412K",
    timestamp: "4 hours ago",
    duration: "16:05",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Top 10 Camera Hacks for Solo Creators",
    channel: "FrameForge",
    views: "2.1M",
    timestamp: "3 weeks ago",
    duration: "10:59",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Red & Black UI Theme Design Walkthrough",
    channel: "UI Doctor",
    views: "298K",
    timestamp: "5 days ago",
    duration: "14:12",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Slow Jazz Beats to Study & Code",
    channel: "LoFi Nexus",
    views: "3.8M",
    timestamp: "2 months ago",
    duration: "1:02:33",
    thumbnail: "/placeholder.svg",
  },
];

export default function Index() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white/90">Trending</h1>
        <div className="text-xs text-white/60">Admin-only uploads · Public viewing</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {videos.concat(videos).map((v, i) => (
          <VideoCard key={`${v.id}-${i}`} video={{ ...v, id: `${v.id}-${i}` }} />
        ))}
      </div>
    </AppLayout>
  );
}
