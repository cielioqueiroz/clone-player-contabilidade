type SocialIconName = "facebook" | "instagram" | "linkedin" | "whatsapp";

export function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle className="social-icon-fill" cx="17.4" cy="6.8" r="1" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.7-.1-1.5-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.2H8.3V13H11v8h3.2Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.4 8.7H3.2V20h3.2V8.7ZM4.8 3.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM9 8.7h3.1v1.5h.1c.4-.8 1.5-1.8 3.4-1.8 3.4 0 4.2 2.3 4.2 5.3V20h-3.3v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V20H9V8.7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 3.6A11.7 11.7 0 0 0 12.1.2C5.7.2.5 5.4.5 11.8c0 2 .5 4 1.5 5.7L.4 23.4l6-1.6c1.7.9 3.7 1.4 5.7 1.4 6.4 0 11.6-5.2 11.6-11.6 0-3-1.2-5.9-3.3-8Zm-8.3 17.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.5.9.9-3.4-.2-.4a9.6 9.6 0 1 1 8.3 4.5Zm5.3-7.2c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6L8.8 6c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 2.2.9 3 .9 4.1.8.7-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.2-.2-.4-.3-.7-.4Z" />
    </svg>
  );
}
