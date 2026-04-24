import { useRouter } from "next/router";

interface ReviewButtonProps {
  hotelId: string;
}

export default function ReviewButton({ hotelId }: ReviewButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/hotels/reviews/${hotelId}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0071c2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Write Review
    </button>
  );
}