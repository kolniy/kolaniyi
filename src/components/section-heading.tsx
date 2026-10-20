export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <header className="reveal max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <div className="draw-line mt-4 w-24" aria-hidden />
      <Tag className="h-section mt-6">{title}</Tag>
      {children && <p className="mt-5 max-w-2xl text-lg text-muted">{children}</p>}
    </header>
  );
}
