export default function eventClosing(a,b){

    let day = a.split("-")[2].split("T")[0]
    let dayEnd =(Number(day)+Number(b)).toString()
    let newDate=a.split("-").slice(0,2).concat(dayEnd).join("-")+"T"+a.split("-")[2].split("T")[1]
    
    return newDate

}