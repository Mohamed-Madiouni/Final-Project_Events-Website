export default function calcul_rating(a){

   let sum=0
   for (let i = 0; i < a.length; i++) {
       sum += a[i].rate;
       
   }
   if (sum==0)
   return sum
else
  { let t=(sum/(a.length)).toString().split(".")
  if(t.length>1)
  { let t1=t[1].split("")
   let newt=[...t[0],...t1[0]]
   let res=newt.join(",")
return res
}
else
    
    return t[0]}
}