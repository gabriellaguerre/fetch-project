import React, {useEffect, useRef} from "react";
import { useModal } from '../Context/Modal'
import {googleMapsApiKey} from '../../redux/locationsSlice';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import './Map.css';


const libraries = ["places"]

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
      console.log("Google Maps API is loaded:", isLoaded);
      console.log("Location received:", location);
      if (window.google && window.google.maps ) {
        console.log("Creating marker at:", location.latitude, location.longitude);

        markerRef.current = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: mapRef.current,
          title: "Location Marker",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Explicit red marker
          },
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
