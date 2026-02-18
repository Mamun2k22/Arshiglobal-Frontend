export default function Section({ title, subtitle, children }) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 mt-2 md:mt-10">
        {title && (
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
          </div>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
