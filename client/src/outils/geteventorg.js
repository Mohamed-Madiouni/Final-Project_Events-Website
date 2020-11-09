export default function getlenthorg(t,id) {
   
let sum=0
    for (let i = 0; i < t.length; i++) {  
        if (t[i].id_organizer==id)
          sum += 1;
      }
      return sum;
    }
  
    
  
  
  export function getlastdateorg(t, id) {
    let date=""
    let newt=[]
    for (let i = 0; i < t.length; i++) {
        if (t[i].id_organizer==id)
         newt = [...newt, t[i]];
      }
     date= newt.slice(0).sort(function(a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      }).reverse()[0].created_at
    
     return date;
    }
  
   
  