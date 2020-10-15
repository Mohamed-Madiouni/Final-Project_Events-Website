export default function resize (url){
    let t=url.split("/")
    t.splice(6,0,"w_0.7,h_0.7,c_scale")
    return t.join("/")
    }
    