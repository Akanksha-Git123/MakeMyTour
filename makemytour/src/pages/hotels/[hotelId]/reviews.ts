import { useRouter } from "next/router";

export default function ReviewButton({ hotelId }) {

  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/hotels/reviews/${hotelId}`)}
      style={{
        padding:"10px 20px",
        background:"#0071c2",
        color:"white",
        border:"none",
        borderRadius:"5px"
      }}
    >
      Write Review
    </button>
  );
}