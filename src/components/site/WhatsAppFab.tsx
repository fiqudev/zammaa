import { MessageCircle } from "lucide-react";
import { waLink } from "@/data/site";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hello Zama Gadgets, I saw your website and I have an inquiry.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Zama Gadgets on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}