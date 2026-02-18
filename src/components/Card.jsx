export default function Card({ children }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}
