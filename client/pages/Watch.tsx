import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/state/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Comment = { id: string; by: string; text: string; at: number };

export default function Watch() {
  const { id = "demo" } = useParams();
  const { user } = useAuth();
  const src =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const likeKey = `like:${id}`;
  const commentsKey = `comments:${id}`;
  const playlistKey = `playlist`;

  const [liked, setLiked] = useState<boolean>(() => localStorage.getItem(likeKey) === "1");
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const raw = localStorage.getItem(commentsKey);
      return raw ? (JSON.parse(raw) as Comment[]) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");
  const [added, setAdded] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(playlistKey);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      return list.includes(id);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(likeKey, liked ? "1" : "0");
  }, [liked, likeKey]);
  useEffect(() => {
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }, [comments, commentsKey]);
  useEffect(() => {
    const raw = localStorage.getItem(playlistKey);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    const next = Array.from(new Set(added ? [...list, id] : list.filter((x) => x !== id)));
    localStorage.setItem(playlistKey, JSON.stringify(next));
  }, [added, id, playlistKey]);

  const canInteract = !!user;

  return (
    <AppLayout>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <section>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]">
            <video controls className="h-full w-full" src={src} poster="placeholder.svg" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">Big Buck Bunny — Demo</h1>
          <div className="mt-2 text-sm text-white/70">1,234,567 views • Uploaded recently</div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => canInteract && setLiked((v) => !v)}
              className={`rounded-full px-4 py-2 text-sm border ${
                canInteract
                  ? liked
                    ? "bg-red-600/30 border-red-500/40 text-white"
                    : "bg-white/5 border-white/10 text-white/80 hover:text-white"
                  : "bg-white/5 border-white/10 text-white/60 cursor-not-allowed"
              }`}
            >
              <span className="mr-2">👍</span> {liked ? "Liked" : canInteract ? "Like" : "Like (sign in)"}
            </button>
            <button
              onClick={() => canInteract && setAdded((v) => !v)}
              className={`rounded-full px-4 py-2 text-sm border ${
                canInteract
                  ? added
                    ? "bg-red-600/30 border-red-500/40 text-white"
                    : "bg-white/5 border-white/10 text-white/80 hover:text-white"
                  : "bg-white/5 border-white/10 text-white/60 cursor-not-allowed"
              }`}
            >
              {added ? "In playlist" : canInteract ? "Add to playlist" : "Add to playlist (sign in)"}
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <h3 className="font-semibold">Comments</h3>
            {canInteract ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const t = text.trim();
                  if (!t) return;
                  setComments((prev) => [
                    { id: crypto.randomUUID(), by: user!.email, text: t, at: Date.now() },
                    ...prev,
                  ]);
                  setText("");
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment"
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 p-2 text-sm"
                />
                <button className="rounded-lg px-3 py-2 text-sm bg-gradient-to-br from-red-600 to-red-700 text-white">
                  Post
                </button>
              </form>
            ) : (
              <p className="text-sm text-white/70 mt-2">Sign in to comment.</p>
            )}

            <ul className="mt-4 space-y-3">
              {comments.length === 0 ? (
                <li className="text-sm text-white/60">No comments yet.</li>
              ) : (
                comments.map((c) => (
                  <li key={c.id} className="text-sm">
                    <span className="text-white/60">{c.by}</span>
                    <span className="mx-1 text-white/40">•</span>
                    <span className="text-white/80">{c.text}</span>
                  </li>
                ))
              )}
            </ul>
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
