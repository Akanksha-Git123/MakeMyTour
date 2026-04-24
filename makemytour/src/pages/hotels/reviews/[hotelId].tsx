import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewsPage() {

  const router = useRouter();
  const { hotelId } = router.query;

  const [reviews,setReviews]=useState<any[]>([])
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState("")
  const [sort,setSort]=useState("newest")

  async function loadReviews(){

    if(!hotelId) return

    const res = await fetch(`http://localhost:8080/api/reviews/${hotelId}`)
    const data = await res.json()

    let sorted=[...data]

    if(sort==="highest"){
      sorted.sort((a,b)=>b.rating-a.rating)
    }

    if(sort==="newest"){
      sorted.reverse()
    }

    setReviews(sorted)
  }

  useEffect(()=>{
    loadReviews()
  },[hotelId,sort])

  async function submitReview(){

    if(rating===0){
      alert("Please select rating")
      return
    }

    await fetch("http://localhost:8080/api/reviews",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        hotelId,
        rating,
        comment
      })
    })

    setRating(0)
    setComment("")
    loadReviews()
  }

  function StarSelector(){

    return(
      <div style={{fontSize:"28px",cursor:"pointer"}}>

        {[1,2,3,4,5].map(star=>(
          <span
          key={star}
          onClick={()=>setRating(star)}
          style={{
            color: star<=rating ? "#facc15" : "#d1d5db"
          }}
          >
            ★
          </span>
        ))}

      </div>
    )
  }

  const average =
    reviews.reduce((sum,r)=>sum+r.rating,0) /
    (reviews.length || 1)

  const ratingCounts=[5,4,3,2,1].map(
    star => reviews.filter(r=>r.rating===star).length
  )

  function ratingLabel(avg:number){

    if(avg>=4.5) return "Excellent"
    if(avg>=4) return "Very Good"
    if(avg>=3) return "Good"
    if(avg>=2) return "Average"

    return "Poor"
  }

  return(

    <div style={{
      maxWidth:"900px",
      margin:"40px auto",
      fontFamily:"Arial"
    }}>

      <h1 style={{fontSize:"30px",fontWeight:"bold"}}>
        Hotel Reviews
      </h1>

      {/* Rating Summary */}

      <div style={{
        display:"flex",
        gap:"40px",
        marginTop:"20px",
        marginBottom:"30px"
      }}>

        {/* Rating Badge */}

        <div style={{
          background:"#2563eb",
          color:"white",
          padding:"20px",
          borderRadius:"10px",
          textAlign:"center",
          minWidth:"120px"
        }}>

          <h2 style={{fontSize:"32px"}}>
            {average.toFixed(1)}
          </h2>

          <p>{ratingLabel(average)}</p>

          <p style={{fontSize:"12px"}}>
            {reviews.length} reviews
          </p>

        </div>

        {/* Rating Breakdown */}

        <div>

          {ratingCounts.map((count,index)=>{

            const star=5-index
            const percent = reviews.length
              ? (count/reviews.length)*100
              : 0

            return(

              <div
              key={star}
              style={{
                display:"flex",
                alignItems:"center",
                marginBottom:"6px"
              }}
              >

                <span style={{width:"35px"}}>
                  {star}★
                </span>

                <div
                style={{
                  background:"#e5e7eb",
                  height:"10px",
                  width:"200px",
                  margin:"0 10px",
                  borderRadius:"5px"
                }}
                >

                  <div
                  style={{
                    width:`${percent}%`,
                    height:"100%",
                    background:"#facc15"
                  }}
                  />

                </div>

                <span>{count}</span>

              </div>

            )

          })}

        </div>

      </div>

      {/* Sorting */}

      <div style={{marginBottom:"20px"}}>

        Sort by :

        <select
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
        style={{marginLeft:"10px"}}
        >

          <option value="newest">
            Newest
          </option>

          <option value="highest">
            Highest Rated
          </option>

        </select>

      </div>

      {/* Review Form */}

      <div
      style={{
        border:"1px solid #ddd",
        padding:"20px",
        borderRadius:"8px",
        marginBottom:"30px",
        background:"#fafafa"
      }}
      >

        <h3>Write Review</h3>

        <StarSelector/>

        <textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        style={{
          width:"100%",
          height:"80px",
          marginTop:"10px",
          padding:"10px"
        }}
        />

        <button
        onClick={submitReview}
        style={{
          marginTop:"10px",
          background:"#2563eb",
          color:"white",
          padding:"8px 16px",
          border:"none",
          borderRadius:"6px"
        }}
        >
          Submit Review
        </button>

      </div>

      {/* Reviews */}

      {reviews.length===0 && (
        <p style={{color:"gray"}}>
          No reviews yet. Be the first to review this hotel!
        </p>
      )}

      {reviews.map((review,index)=>(

        <div
        key={index}
        style={{
          border:"1px solid #ddd",
          padding:"20px",
          marginBottom:"15px",
          borderRadius:"10px",
          background:"white"
        }}
        >

          {/* User */}

          <div style={{
            display:"flex",
            alignItems:"center",
            marginBottom:"10px"
          }}>

            <div style={{
              width:"35px",
              height:"35px",
              borderRadius:"50%",
              background:"#2563eb",
              color:"white",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              fontWeight:"bold",
              marginRight:"10px"
            }}>
              U
            </div>

            <div>

              <p style={{fontWeight:"bold"}}>
                User
              </p>

              <p style={{
                fontSize:"12px",
                color:"gray"
              }}>
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "Recently"}
              </p>

            </div>

          </div>

          {/* Rating */}

          <div style={{
            color:"#facc15",
            fontSize:"18px"
          }}>
            {"★".repeat(review.rating)}
          </div>

          {/* Comment */}

          <p style={{marginTop:"8px"}}>
            {review.comment}
          </p>

          {/* Helpful */}

          <button
          style={{
            marginTop:"10px",
            background:"#f3f4f6",
            border:"none",
            padding:"6px 12px",
            borderRadius:"5px",
            cursor:"pointer"
          }}
          >
            👍 Helpful
          </button>

        </div>

      ))}

    </div>

  )

}