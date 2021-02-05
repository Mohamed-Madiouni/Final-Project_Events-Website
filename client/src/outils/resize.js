export default function resize (url){
    let t=url.split("/")
    t.splice(6,0,"w_0.9,h_0.9,c_scale")
    return t.join("/")
    }
    