import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/966500000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 end-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-24 end-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-elegant transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}