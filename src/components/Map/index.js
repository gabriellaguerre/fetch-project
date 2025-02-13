import React, {useEffect, useRef} from "react";
import { useModal } from '../Context/Modal'
import {googleMapsApiKey} from '../../redux/locationsSlice';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import './Map.css';


const libraries = ["marker"]

function Map({location}){
  
  const {closeModal} = useModal();
  

  const mapContainerStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "10px",
  };

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries
  });

  useEffect(() => {
    if (isLoaded && mapRef.current && location) {
      // Ensure google is available
      if (window.google && window.google.maps && window.google.maps.marker) {
        const { AdvancedMarkerElement } = window.google.maps.marker;
        
        // Create AdvancedMarkerElement
        markerRef.current = new AdvancedMarkerElement({
          position: { lat: location.latitude, lng: location.longitude },
          map: mapRef.current,
          title: "Location Marker",
        });
      } else {
        console.error("Google Maps API not loaded properly.");
      }
    }
  }, [isLoaded, location]);

 

  return isLoaded ? (
         <div className='mapModalContainer'> 
        <div className='mapGoogle'><GoogleMap mapContainerStyle={mapContainerStyle} center={{lat: location?.latitude, lng: location?.longitude}} zoom={10} onLoad={(map) => (mapRef.current = map)} /></div>
      
        <div className='cityCounty'>
        <div>City: {location?.city}</div>
        <div>County: {location?.county}</div>
        </div>
      
        <div className='stateZip'>
        <div>State: {location?.state}</div>
        <div>Zip Code: {location?.zip_code}</div>
        </div>

        <div className='mapCloseButtonDiv'><button className='closeMapModalButton'onClick={closeModal}>Close</button></div>
        </div>
    ) : (
        <div>Loading map...</div>
    );
}
export default Map;

