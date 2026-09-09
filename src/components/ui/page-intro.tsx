export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <div className="intro-art" aria-hidden="true">
        <div className="intro-orbit">
          <i />
          <i />
          <i />
        </div>
      </div>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{description}</p>
    </div>
  );
}
