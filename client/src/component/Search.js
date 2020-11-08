import React from 'react';
import "../Search.css"
const Search = ({setQuickSearch,quickSearch}) => {
    const onChange = (e) => {
        setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value })};
    return (
        <div >
            <div class="thb-agency-listing-explore cf">
    <div class="wrap">
      <div >
        <div class=" vc_column_container vc_col-sm-12">
          <div class="vc_column-inner">
            <div class="thb-offset-title form-field">
              <h2 className="tit1">Looking for an event?</h2>
                <div class=" wpb_row vc_row-fluid">
                  <div class="row">
                    <div class="wpb_column vc_column_container vc_col-sm-12 vc_col-sm-8">
                         <div class="thb-multi-select cf">
                                 <div class="select-agency-list region-list icon unselected">  
          <form class="  wpcf7-form-control wpcf7-select form-input dropdown" >
          <div class=" col s4 m5 wpb_column vc_column_container vc_col-sm-12 vc_col-sm-4">
          <p className="para-11">Select an event state or choose title or tag to discover top digital events near you.</p></div>
          <div className="input-field col s3 m2">
          <input placeholder="event title"
           id="title"
           type="text"  
           value ={quickSearch.title}
           onChange={onChange}/>
          <label forhtml="title">Event title</label>
        </div>
        <div className="input-field col s3 m2 ">
    <select class="wpcf7-form-control wpcf7-select form-input dropdown" 
    id ="state"
     value={quickSearch.state}
      onChange={onChange}
       style={{display:"initial",
       marginTop:4,
       borderRadius:5,
       outline:"none"}}>
      <option value="">State</option>
      <option value="Available" className="green-text">Available</option>
      <option value="Closed" className="gray-text">Closed</option>
      <option value="Ended" className="gray-text">Ended</option>
    </select>
    <label className="active">Event state</label>
  </div>
  <div className="input-field col s3 m2">
          <input placeholder="Tags search" id="tags" type="text" value={quickSearch.tags} onChange={onChange}/>
          <label forhtml="title">Event tags</label>
        </div>
        </form>
        </div>
        </div> 
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
   </div>
 </div>
   </div>
        </div>
    );
};

export default Search;