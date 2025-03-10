import React, {useEffect, useRef, useState} from "react";
// import { useModal } from '../Context/Modal'
import {googleMapsApiKey} from '../../redux/locationsSlice';
import { GoogleMap, useJsApiLoader, Marker,DirectionsRenderer } from "@react-google-maps/api";
import './Map.css';


const libraries = ["places"]

function Map({location}){
  // console.log(location[0].locationData, "location inside Map function line 11")
  // const {closeModal} = useModal();
  // const destination = { lat: location[0]?.locationData?.latitude, lng: location[0]?.locationData?.longitude };
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)
  const [distance, setDistance] = useState('')

  useEffect(() => {
    if (location && location.length > 0 && location[0]?.locationData) {
      const { latitude, longitude } = location[0].locationData;
      // console.log(latitude, longitude, 'useEffect line 22')
      if (typeof latitude === "number" && typeof longitude === "number") {
        setDestination({ lat: latitude, lng: longitude });
      } else {
        console.error("Invalid destination coordinates:", latitude, longitude);
      }
    }
  }, [location]);

  console.log(destination, 'destination line 31')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);

          if(destination && window.google) {
          getRoute(userCoords, destination);
          }
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, [destination]);

  console.log(userLocation, 'userLocation line 53')

  const getRoute = (origin, destination) => {
    console.log(origin, destination, 'getRoute line 56')
    if (!origin || !destination || !window.google) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING, // Can be "WALKING", "BICYCLING", "TRANSIT"
      },
      (result, status) => {
        console.log(status, result, 'status, result line 65')
        if (status === "OK") {
          setDirections(result);
          setIsLoaded(true)
          const distance = result.routes[0].legs[0].distance.text
          setDistance(distance)
          console.log(distance, 'distance line 71')
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  console.log(directions, 'directions line 75')
  const mapContainerStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
  };

  // const mapRef = useRef(null);
  // const markerRef = useRef(null);
  // const [mapReady, setMapReady] = useState(false);

  // Load Google Maps API
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: googleMapsApiKey,
  //   libraries
  // });

  // const handleMapLoad = (map) => {
  //   // console.log("Google Map Loaded", map);
  //   mapRef.current = map;
  //   setMapReady(true); // Ensure marker rendering waits for this
  // };

  // console.log(isLoaded, mapReady, 'line 30')
  // google.maps.marker.AdvancedMarkerElement
  // window.google.maps
  // window.google.maps.Marker

  // useEffect(() => {
  //   if (isLoaded && mapReady && location) {

  //     // console.log("Google Maps API is loaded:", isLoaded);
  //     // console.log("Location received:", location);

  //     if (window.google && window.google.maps ) {
  //       // console.log("Creating marker at:", location.latitude, location.longitude);

  //       markerRef.current = new window.google.maps.Marker({
  //         position: { lat: location[0]?.locationData?.latitude, lng: location[0]?.locationData?.longitude },
  //         map: mapRef.current,
  //         title: "Location Marker",
  //         icon: {
  //           url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Explicit red marker
  //         },
  //       });
  //     } else {
  //       console.error("Google Maps API not loaded properly.");
  //     }
  //   }
  // }, [isLoaded, mapReady, location]);


  console.log(isLoaded, destination, 'line 128')
  return isLoaded && destination ? (
         <>
      
          <GoogleMap mapContainerStyle={mapContainerStyle} center={userLocation || destination} zoom={10} onLoad={()=>setIsLoaded(true)} options={{mapTypeControl: false}}>
          {userLocation && <Marker position={userLocation}  />}
          {destination && <Marker position={destination} />}
          {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "red", strokeWeight: 4 } }} />}
          </GoogleMap>
          <div>distance: {distance}</div>
         
        {/* <div className='cityCounty'>
        <div>City: {location?.city}</div>
        <div>County: {location?.county}</div>
        </div>

        <div className='stateZip'>
        <div>State: {location?.state}</div>
        <div>Zip Code: {location?.zip_code}</div>
        </div> */}

        {/* <div className='mapCloseButtonDiv'><button className='closeMapModalButton'onClick={closeModal}>Close</button></div> */}
        </>
    ) : (
        <div>Loading map...</div>
    );
}
export default Map;
