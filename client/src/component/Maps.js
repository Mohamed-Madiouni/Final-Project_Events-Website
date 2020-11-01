import React from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import { formatRelative } from "date-fns";

// import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 35.6,
  lng: 10
};
const libraries=["places"]

const options = {
  styles: mapStyles,
}


function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_MAPS,
      libraries
    });

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";



  return (
   
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    
  )
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

export default MyComponent
