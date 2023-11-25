import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

const googleApiKey = 'AIzaSyBBVLikZWGvzI6BZ3zER1DDcOMcGXmm2ZI';
//'AIzaSyCTEc8bsYUd3rG7vHK3bdIKDH14iDbFXZ0';
const mapContainerStyle = {
  width: '1300px',
  height: '800px',
  border: '10px solid #000000',
  borderRadius: '10px',
  margin: '5% 0 0 5%',
};
const center = {
  lat: 28.602542,
  lng: -81.200367,
};


const MarkerIcon = {
  path: "M35 28h-7.999v-23h7.999c0.553 0 1 0.447 1 1v21c0 0.552-0.447 1-1 1zM31.001 24h1v-1h-1v1zM31.001 22h1v-1h-1v1zM31.001 20h1v-1h-1v1zM29.001 24h0.999v-1h-0.999v1zM29.001 22h0.999v-1h-0.999v1zM29.001 20h0.999v-1h-0.999v1zM34.001 9h-5v3h5v-3zM34.001 19h-1v1h1v-1zM34.001 21h-1v1h1v-1zM34.001 23h-1v1h1v-1zM0 27v-21c0-0.553 0.448-1 1.001-1h25v23h-25c-0.553 0-1.001-0.448-1.001-1zM24.039 17.509c0.553 0 1-0.448 1-1 0-0.553-0.447-1-1-1-0.552 0-1 0.447-1 1 0 0.552 0.448 1 1 1zM4 23c0 0.552 0.448 1 1.001 1h15.999c0.553 0 1-0.448 1-1v-13c0-0.553-0.447-1-1-1h-15.999c-0.553 0-1.001 0.447-1.001 1v13z",
  fillColor: "black",
  fillOpacity: 1,
  strokeWeight: 1,
  rotation: 0,
  scale: 1,
};

const MapWithDirections = () => {
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);

  

  useEffect(() => {


    const fetchDestination = async () => {
        try{
            /*
            //Below is where we would retriece GPS cordinate
            const response = await fetch();
            const gpsPoint = await response.json();
            
            if(gpsPoint.length>0)
            {
                //
                
            }*/
            setDestination({ lat: 28.603053, lng: -81.197863 });
        }catch(error){
            console.error('Error fetching destination',error);
        }
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };
    fetchDestination();
    getLocation();
}, []);

useEffect(()=> {
    if(origin && destination)
    {
        fetchDirections(origin,destination);
    }
},[origin,destination]);


const fetchDirections = (origin, destination) => {
    if (window.google && window.google.maps) {    
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
        {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            } else {
            console.error(`Error fetching directions: ${status}`);
            }
        }
        );
    }
};
if (!origin || !destination) {

}

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        zoomControl = {true}
      >
      
        {directions && (
          <>
            <Marker
              position={destination}
              icon = {MarkerIcon}
            />


            <DirectionsService
              options={{
                origin: directions.request.origin,
                destination: directions.request.destination,
                travelMode: window.google.maps.TravelMode.WALKING,
              }}
              callback={(result) => {
                if (result !== null) {
                  setDirections(result);
                }
              }}
            />
            <DirectionsRenderer
              options={{ directions: directions, suppressMarkers: true }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithDirections;