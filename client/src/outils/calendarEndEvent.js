export default function calendarEndEvent(a,b){

    let day = a.split("-")[2]
    let dayEnd =(Number(day)+Number(b)).toString()
  
    if(dayEnd.length==1)
   { 
dayEnd="0"+dayEnd}
    let newDate=a.split("-").slice(0,2).concat(dayEnd).join("-")
   
    return newDate

}
