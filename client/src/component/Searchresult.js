import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/authaction';
import {getEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import Navbar from './Navbar';
let url = require('url');
let querystring = require('querystring');



function Searchresult() {
   const dispatch = useDispatch()
   const history =useHistory()
    let params = querystring.parse(url.parse(window.location.href).query);
    const allevents=useSelector(state=>state.events.allEvents)
    let auth = useSelector(state=>state.auth)
    const [initial,setInitial]=useState([])
    useEffect(()=>{
        dispatch(getEvent())
       localStorage.token&&dispatch(getCurrentUser())
    },[])


    let search=allevents.filter(el=>{
      return(
       el.title.toLowerCase().includes(params.title?params.title.toLowerCase():"")
       &&el.address.toLowerCase().includes(params.address?params.address.toLowerCase():"")
       &&el.description.toLowerCase().includes(params.description?params.description.toLowerCase():""))
     })

    useEffect(()=>{setInitial(allevents.filter(el=>{
    return(
     el.title.toLowerCase().includes(params.title?params.title.toLowerCase():"")
     &&el.address.toLowerCase().includes(params.address?params.address.toLowerCase():"")
     &&el.description.toLowerCase().includes(params.description?params.description.toLowerCase():""))
   }))},[])
   
   


    
 
 
    return (
        <div>
            <Navbar/>
            {('title' in params || 'address' in params || "description" in params)&&search.length!=0? 
            <div>
            <div className="row"> <h5> <b>{search.length+" result(s) found"}</b> </h5></div>
            <div className="container " style={{display:"flex",justifyContent: "space-between", alignItems:"center", flexWrap:"wrap"}}>

 {search&&search.map(el=>{
     return (<div
                  className="card small sticky-action"
                  style={{
                    width: 350,
                    height:350
                    
                  }}
                  key={el._id}
                >
                  <div className="card-image waves-effect waves-block waves-light" style={{height:"55%"}}>
                    <img className="activator" src={el.image} />

                    <div className="date right">
                      <div className="day">{el.date.split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(el.date.split("-")[1]))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-content "
                    style={{ padding: "0px 10px 0px 24px" }}
                  >
                    <span className="card-title  grey-text text-darken-4">
                      <b>{el.title}</b>
                    </span>
                    <p className="red-text">{el.address}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          margin: 10,
                          marginLeft: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className=" tiny material-icons"
                          style={{ margin: 10, transform: "translateY(1.4px)" }}
                        >
                          history
                        </i>

                        {historyevent(el.created_at)}
                      </span>
                      <span
                        style={{
                          margin: 10,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className=" tiny material-icons"
                          style={{ margin: 10 }}
                        >
                          person
                        </i>

                        {el.nb_participant}
                      </span>
                    </div>
                  </div>
                  <div
                    className="card-action"
                    style={{
                      padding: "10px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {!auth.isAuthenticated?
                    <button
                    
                      onClick={()=>{
                        history.push("/login")
                      }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small green white-text"
                    >
                      Participate
                      
                    </button>:auth.user.role=="participant"&&
                    <button
                    
                      // onClick={()=>{
                      //   history.push("/login")
                      // }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small green white-text"
                    >
                      Participate
                      
                    </button>}
                    <span
                      className={
                        el.state == "Available"
                          ? "right green-text"
                          : "right gray-text text-darken-3"
                      }
                    >
                      {" "}
                      {el.state}
                    </span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      <b>{el.title}</b>
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{el.description}</p>
                    {/* <div
                      className="right"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <a
                        className="btn-floating waves-effect waves-light cadetblue"
                        onClick={() => {
                          setAction({ type: "edit", payload: el });
                          if(modal){
                           
                            setModal(toggle( toggle()))
                          }
                          if(!modal)
                          toggle()
                          setParticipant(false)
                          setModalId(el._id)
                        }}
                        title="edit"
                      >
                        <i className="material-icons ">edit</i>
                      </a>
                      <button
                        className="btn-floating waves-effect waves-light cadetblue modal-trigger"
                        title="delete"
                        data-target="modal1"
                        onClick={() => setDeleteid(el._id)}
                      >
                        <i className="material-icons ">delete</i>{" "}
                      </button>
                      {el.state=="Available"&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="close"   data-target="modal2" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">block</i>{" "}
                    </button>)}
                    {el.state=="Closed"&&(new Date(el.date)>new Date())&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)}
                    </div> */}
                  </div>
                </div>)

 })}
            </div></div>:
           initial.length!=0 && (<div className="container">
              <h5> <b>No result found</b> </h5>
            </div>)}
        </div>
    )
}

export default Searchresult
