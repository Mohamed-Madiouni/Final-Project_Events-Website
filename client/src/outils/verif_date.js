export default function verif_date(d){
    let t=d.split(":")
  
   
    if(t.length!=2)
    return false
    else
    { let str1=t[0].match(/\d/gi)
    let str2=t[1].match(/\d/gi)
   
     if(t[0].length!=2||t[1].length!=2)
    return false
    else
     if(str1==null||str2==null)
     return false
   
    else
    return true}
  }
  
  