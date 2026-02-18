import { useLoaderData } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");
const toAbsolute = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  return `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
};

function Card({ children }) {
  return <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition">{children}</div>;
}

function getYouTubeEmbed(url) {
  if (!url) return "";
  // supports youtu.be/ID or youtube.com/watch?v=ID
  const m1 = url.match(/v=([^&]+)/);
  const m2 = url.match(/youtu\.be\/([^?]+)/);
  const id = m1?.[1] || m2?.[1] || "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

export default function Media() {
  const data = useLoaderData();
  const galleryItems = data?.gallery?.items || [];
  const videos = data?.videos?.items || [];

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 mt-2 md:mt-10">
          <div className="text-3xl md:text-4xl font-extrabold">Media</div>
          <p className="mt-2 text-slate-200 max-w-2xl">
            Office gallery and helpful videos about our process and services.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          {/* Gallery */}
          <div>
            <div className="text-xl font-bold">Gallery</div>
            <p className="mt-1 text-slate-600">A glimpse of our office and activities.</p>

            {galleryItems.length ? (
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryItems.map((g) => (
                  <Card key={g._id}>
                    <div className="overflow-hidden rounded-2xl">
                      <div className="h-52 bg-slate-100">
                        <img
                          src={toAbsolute(g.imageUrl)}
                          alt={g.title || "Gallery image"}
                          className="h-52 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="font-semibold">{g.title || "Gallery"}</div>
                      {g.caption ? <div className="mt-1 text-sm text-slate-600">{g.caption}</div> : null}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border bg-white p-8 text-slate-600">No gallery items yet.</div>
            )}
          </div>

          {/* Videos */}
          <div>
            <div className="text-xl font-bold">Videos</div>
            <p className="mt-1 text-slate-600">Watch step-by-step guides and updates.</p>

            {videos.length ? (
              <div className="mt-5 grid lg:grid-cols-3 gap-5">
                {videos.map((v) => {
                  const embed = getYouTubeEmbed(v.youtubeUrl);
                  return (
                    <Card key={v._id}>
                      <div className="p-5">
                        <div className="font-semibold text-lg">{v.title}</div>
                        {v.description ? <div className="mt-1 text-sm text-slate-600">{v.description}</div> : null}
                      </div>
                      <div className="aspect-video bg-black">
                        {embed ? (
                          <iframe
                            className="w-full h-full"
                            src={embed}
                            title={v.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-white/80 text-sm">
                            Invalid YouTube URL
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border bg-white p-8 text-slate-600">No videos yet.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
