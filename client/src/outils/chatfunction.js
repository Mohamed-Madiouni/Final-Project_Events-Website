export default function ischat(t,id,id1){

for(let i=0;i<t.length;i++){
    if(t[i].users.includes(id)&&t[i].users.includes(id1))
    return true
}
return false
}