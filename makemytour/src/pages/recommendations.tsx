import { useEffect, useState } from "react";

export default function RecommendationsPage(){

  const [data,setData]=useState<any>(null)

  const userId="user123"

  async function loadRecommendations(){

    const res=await fetch(`http://localhost:8080/api/recommendations/${userId}`)
    const result=await res.json()

    setData(result)
  }

  useEffect(()=>{
    loadRecommendations()
  },[])

  async function sendFeedback(hotelId:string,helpful:boolean){

    await fetch("http://localhost:8080/api/feedback",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        userId,
        hotelId,
        helpful
      })
    })

    alert("Feedback saved")
  }

  if(!data) return <p>Loading...</p>

  return(
    <div style={{maxWidth:"800px",margin:"40px auto"}}>

      <h1>Recommended for You</h1>

      <p style={{color:"gray"}}>
        {data.reason}
      </p>

      {data.hotels.map((hotel:any)=>(
        <div key={hotel.id} style={{
          border:"1px solid #ddd",
          padding:"15px",
          marginTop:"10px",
          borderRadius:"8px"
        }}>

          <h3>{hotel.name}</h3>
          <p>{hotel.city}</p>

          <button onClick={()=>sendFeedback(hotel.id,true)}>
            👍 Helpful
          </button>

          <button onClick={()=>sendFeedback(hotel.id,false)}>
            👎 Not Relevant
          </button>

        </div>
      ))}

    </div>
  )
}