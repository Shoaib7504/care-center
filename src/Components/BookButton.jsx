"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

const BookButton = ({ productId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session?.user) {
      router.push("/login");
    } else {
      router.push(`/booking/${productId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cta-btn flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold text-sm shadow-soft"
    >
      Book now <ArrowRight className="h-4 w-4" />
    </button>
  );
};

export default BookButton;