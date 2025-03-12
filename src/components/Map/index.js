import React, {useEffect, useState} from "react";
import { GoogleMap, Marker,DirectionsRenderer } from "@react-google-maps/api";
import './Map.css';




function Map({location}){

  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)
  const [distance, setDistance] = useState('')

  //If there is location data for the matched dog in the prop then set the destination 
  useEffect(() => {
    if (location && location.length > 0 && location[0]?.locationData) {
      const { latitude, longitude } = location[0].locationData;

      if (typeof latitude === "number" && typeof longitude === "number") {
        setDestination({ lat: latitude, lng: longitude });
      } else {
        console.error("Invalid destination coordinates:", latitude, longitude);
      }
    }
  }, [location]);

  //Gets user geolocation from the browser
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


  //Get the route from google maps with location data and user data
  const getRoute = (origin, destination) => {

    if (!origin || !destination || !window.google) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING, // Can be "WALKING", "BICYCLING", "TRANSIT"
      },
      (result, status) => {

        if (status === "OK") {
          setDirections(result);
          setIsLoaded(true)
          const distance = result?.routes[0]?.legs[0]?.distance.text
          setDistance(distance)

        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };


  const mapContainerStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
  };


  return isLoaded && destination ? (
         <>

          <GoogleMap mapContainerStyle={mapContainerStyle} center={userLocation || destination} zoom={10} onLoad={()=>setIsLoaded(true)} options={{mapTypeControl: false}}>
          {userLocation && <Marker position={userLocation}  />}
          {destination && <Marker position={destination} />}
          {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "red", strokeWeight: 4 } }} />}
          </GoogleMap>
          <div className='distance'>Distance: {distance}</div>
        </>
    ) : (
        <div>Loading map...</div>
    );
}
export default Map;
