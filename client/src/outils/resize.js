export default function resize (url){
    let t=url.split("/")
    t.splice(6,0,"w_0.8,h_0.8,c_scale")
    return t.join("/")
    }
    