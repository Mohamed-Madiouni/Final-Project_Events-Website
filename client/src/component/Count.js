import React, { useEffect, useRef, useState } from 'react'
import "../count.scss"

function Count({date}) {
console.log(date)
const [timerDays,setTimerDays]=useState("00")
const [timerHours,setTimersHours]=useState("00")
const [timerMinutes,setTimersMinutes]=useState("00")
const [timerSeconds,setTimersSeconds]=useState("00")

let interval =useRef();
const startTimer=()=>{
 
 if(date!=undefined)
    {   const countdowndate = new Date(date&&date).getTime();
    interval=setInterval(()=>{
const now =new Date().getTime();
const distance = countdowndate-now
const days=Math.floor(distance/(1000*60*60*24))
const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60))
const Minutes=Math.floor((distance%(1000*60*60))/(1000*60))
const seconds=Math.floor((distance%(1000*60))/1000)
if(distance<0)
{
clearInterval(interval.current)
}
else{
    setTimerDays(days)
    setTimersHours(hours)
    setTimersMinutes(Minutes)
    setTimersSeconds(seconds)
}
    },1000)}
}

useEffect(()=>{
startTimer()
return ()=>{
    clearInterval(interval.current)
}
})
    return (
        <div className="countdown">
            <div className="timer">
                <div>
           <section>
               <p>{timerDays}</p>
               <p><small>Days</small></p>
           </section>
           <span>:</span>
           <section>
               <p>{timerHours}</p>
               <p><small>Hours</small></p>
           </section>
           <span>:</span>
           <section>
               <p>{timerMinutes}</p>
               <p><small>Minutes</small></p>
           </section>
           <span>:</span>
           <section>
               <p>{timerSeconds}</p>
               <p><small>Seconds</small></p>
           </section>
           </div>
           </div>
        </div>
    )
}

export default Count