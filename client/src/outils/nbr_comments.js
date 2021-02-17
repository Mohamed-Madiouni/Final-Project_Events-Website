export default function nbr(d){
    let nb=Number(d)
    if (d<1000)
    return d
    else if (d<1000000)
    return d%1000===0?`${Math.round(d/1000)} k`:`${Math.round(d/1000)},${(Math.round(d%1000).toString()[0])} k`
    else
    return d%1000000===0?`${Math.round(d/1000000)} M`:`${Math.round(d/1000000)},${Math.round(d%1000000).toString()[0]} M`
}