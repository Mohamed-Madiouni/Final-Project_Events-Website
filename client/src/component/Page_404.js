import React from 'react'
import "../404.scss"
function Page_404() {
    return (
        
<div className="page404 container " style={{position:"relative",height:"80vh"}}>



<div className="text"><p style={{fontSize:"20rem"}}>404</p></div>
<div className="container">
  
  <div className="caveman">
    <div className="leg">
      <div className="foot"><div className="fingers"></div></div>      
    </div>
    <div className="leg">
      <div className="foot"><div className="fingers"></div></div>      
    </div>
    <div className="shape">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
    <div className="head">
      <div className="eye"><div className="nose"></div></div>
      <div className="mouth"></div>
    </div>
    <div className="arm-right"><div className="club"></div></div>    
  </div>
  
  <div className="caveman">
    <div className="leg">
      <div className="foot"><div className="fingers"></div></div>      
    </div>
    <div className="leg">
      <div className="foot"><div className="fingers"></div></div>      
    </div>
    <div className="shape">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
    <div className="head">
      <div className="eye"><div className="nose"></div></div>
      <div className="mouth"></div>
    </div>
    <div className="arm-right"><div className="club"></div></div>    
  </div>
</div>

<div  style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",position:"absolute",top:"72vh"}}>
<a className="btn-404" href="/">Go Home</a>
</div>

</div>
        )
    
    }

export default Page_404
