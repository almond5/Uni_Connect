import React, { useMemo, useState } from 'react';
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';

const GoogleMapView = (props: { lat: any, length: any, setLat: any, setLng: any }) => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: 28.6024, lng: -81.2001 }), []);
  const [guessCoords, setGuessCoords] = useState({lat: 0, lng: 0});

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setGuessCoords({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });

  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="flex justify-center ">
        <div
          className="block p-2.5 text-md w-min text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
    rounded-tl-none border-neutral-700"
        >
          <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.TERRAIN}
            mapContainerStyle={{ width: '600px', height: '600px' }}
            onLoad={() => console.log('Map Component Loaded...')}
            onClick={(e) => {handleMapClick(e)}}
          >
            <MarkerF position={guessCoords} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapView;
