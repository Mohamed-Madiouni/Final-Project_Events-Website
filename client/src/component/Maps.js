import React,{useState,useRef, useCallback, useEffect} from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import Geocode from "react-geocode";
import "../maps.css"
import { ADD_PLACE } from '../actions/types';
import { useDispatch, useSelector } from 'react-redux';


const containerStyle = {
  width: '100%',
  height: '100%'
};

// const center = {
  
 
// };
// const libraries=["places"]

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}


function MyMap() {
 
  const dispatch=useDispatch()
  const map=useSelector(state=>state.map)
  const allevents=useSelector(state=>state.events.allEvents)
  const alleventsadmin=useSelector(state=>state.admin.events)
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_MAPS,
  //   libraries
  // });

  const [center,setcenter] =useState({
    lat: 35.559043,
    lng: 9.365944
  })
  const [markers, setMarkers] = useState({});
  const [select,setselect]=useState(null)
const onMapClick=useCallback((event)=>{
  setMarkers({lat:event.latLng.lat(),lng:event.latLng.lng()})
//  console.log(markers)
  

 
},[])
const mapRef =useRef()
const onMapLoad = useCallback((map) => {
  mapRef.current = map;
}, []);

// useEffect(()=>{
//   if(map.selected.lat)
//   {
   
// }
// },[])

const panTo=useCallback(({lat,lng})=>{
mapRef.current.panTo({lat,lng})
mapRef.current.setZoom(16)
},[])

useEffect(()=>{
if(map.selected.lat)
{
  setcenter({
    lat:map.selected.lat,
    lng:map.selected.lng
  })
setMarkers(map.selected)

}
},[map.selected.lat])

useEffect(()=>{
  if(map.focus.lat&&map.type=="show")
  {
    setcenter({
      lat:map.focus.lat,
      lng:map.focus.lng
    })
  
  }
  },[map.focus.lat])
  

useEffect(() => {
  Geocode.setApiKey(process.env.REACT_APP_MAPS);
}, [])

useEffect(()=>{
  if(markers.lat)
  Geocode.fromLatLng(markers.lat,markers.lng).then(
    response => {
      const address = response.results[0].formatted_address;
     
 dispatch({
    type:ADD_PLACE,
    payload:{
      lat:markers.lat,
      lng:markers.lng,
      address:address
    }
  })

    },
    error => {
      console.error(error);
    }
  )
},[markers.lat])

    // if (loadError) return "Error";
    // if (!isLoaded) return "Loading...";



  return (
   <div style={{height:"100%",width:"100%",position:"relative"}} className="googlemap">
    <Search panTo={panTo}/>
    <Locate panTo={panTo}/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={(map.selected.lat||map.focus.lat)?16:8}
        options={options}
        onClick={map.type=="add"&&onMapClick}
        onLoad={onMapLoad}
      >

       {map.type=="add" ?<Marker 
       position={markers.lat&&{lat:markers.lat,lng:markers.lng}}
       icon={{
        url: `/logo12.jpg`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      draggable={true}
      onDragEnd={onMapClick}
      // onClick={()=>setselect(markers)}
       />
:      
alleventsadmin.length==0?allevents.map((el,i)=>
(<Marker   
key={i}
        position={{lat:el.address.lat,lng:el.address.lng}}
        icon={{
         url: `/logo12.jpg`,
         origin: new window.google.maps.Point(0, 0),
         anchor: new window.google.maps.Point(15, 15),
         scaledSize: new window.google.maps.Size(30, 30),
       }}
       // draggable={true}
       // onDragEnd={onMapClick}
       onClick={()=>{
         setselect(el)
        panTo({
          lat:el.address.lat,lng:el.address.lng
        })
        
        }}
        />
       
       ))
      :
      alleventsadmin.map((el,i)=>
(<Marker   
key={i}
        position={{lat:el.address.lat,lng:el.address.lng}}
        icon={{
         url: `/logo12.jpg`,
         origin: new window.google.maps.Point(0, 0),
         anchor: new window.google.maps.Point(15, 15),
         scaledSize: new window.google.maps.Size(30, 30),
       }}
       // draggable={true}
       // onDragEnd={onMapClick}
       onClick={()=>{
         setselect(el)
         panTo({
          lat:el.address.lat,lng:el.address.lng
        })
        }}
        />
       
       ))
      
      
      }
       
        
{select?(<InfoWindow position={{lat:select.address.lat,lng:select.address.lng}} 
onCloseClick={()=>setselect(null)}>
  <div style={{lineHeight:"25px"}}>
<h5>{select.title}</h5>
<p>{formatRelative(new Date(select.start),new Date())+" - "+formatRelative(new Date(select.end),new Date())}</p>
<p>{select.address.address}</p>
<p className={select.state == "Available"? "green-text": " gray-text text-darken-3"}>
  <b>{select.state}</b></p>

  </div>
</InfoWindow>):null}
      </GoogleMap>
      </div>
  )
}


function Locate({ panTo }) {
  return (
    <button
      className="locate_map"
      onClick={() => {
        document.querySelector(".locate_map").style.background="none"
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search ({panTo}){
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: {
    //   radius: 100 * 1000,
    // },
  });

  return (
    <div className="search_map" style={{width:"50%"}}>
      <Combobox onSelect={async(address)=>{
        setValue(address,false)
        clearSuggestions()
try{
const result = await getGeocode({address})
const {lat,lng}= await getLatLng(result[0])
panTo({lat,lng})
}catch(err){
  console.log(err)
}

      }}>
        <ComboboxInput
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({description},i) => (
                <ComboboxOption key={i} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );

}

// import { GoogleMap, Marker,withGoogleMap,withScriptjs, } from "react-google-maps"

// function map(){
//     return (
//     <GoogleMap 
//     defaultZoom={10} 
//     defaultCenter={{lat:35.671165,lng:10.100547}}
//     />
//     )
// }

// const WrappedMap=withScriptjs(withGoogleMap(map))
// function Maps() {
//     return (
//         <div style={{height:"100vh",width:"100vw"}}>
//             <WrappedMap 
//             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS}`}
//             loadingElement={<div style={{ height: `100%` }} />}
//             containerElement={<div style={{ height: `100%` }} />}
//             mapElement={<div style={{ height: `100%` }} />}
            
            
//             />
//         </div>
//     )
// }

export default MyMap
