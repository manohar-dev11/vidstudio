const works = [
  { title: "Brand Film", category: "Commercial" },
  { title: "Wedding Highlights", category: "Events" },
  { title: "YouTube Edit", category: "Social" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-6 py-32 text-center">
        <h1 className="text-5xl font-bold md:text-7xl">Stories, cut to perfection.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Professional video editing for brands, creators and filmmakers.
        </p>
        <a href="#work" className="mt-10 inline-block rounded-full bg-white px-8 py-3 font-semibold text-black">
          View my work
        </a>
      </section>

      <section id="work" className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        {works.map((w) => (
          <div key={w.title} className="rounded-2xl border border-zinc-800 p-4">
            <div className="aspect-video rounded-xl bg-zinc-900" />
            <h3 className="mt-4 font-semibold">{w.title}</h3>
            <p className="text-sm text-zinc-500">{w.category}</p>
          </div>
        ))}
      </section>
    </main>
  );
}