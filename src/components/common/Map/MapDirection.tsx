import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface IAppGoogleMapProp {
  pointer: { lat: number; lng: number };
  onChange?: (payload: { lat: number; lng: number; address?: string }) => void;
}
const MapDirection: React.FC<IAppGoogleMapProp> = ({ pointer, onChange }) => {
  const [zoom, setZoom] = useState(10);
  const [markerLocation, setMarkerLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  const [center, setCenter] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    if (!pointer) {
      setMarkerLocation({
        lat: 23.801450437413685,
        lng: 90.40764968634076,
      });
      setCenter({
        lat: 23.801450437413685,
        lng: 90.40764968634076,
      });
      setZoom(10);
    } else {
      setMarkerLocation(pointer);
      setCenter(pointer);
      setZoom(16);
    }
  }, [pointer]);

  return (
    <>
      <GoogleMap
        zoom={zoom}
        mapContainerStyle={{ width: "100%", height: "350px" }}
        center={center}
        // options={{ styles: mapStyle3 }}
      >
        <MarkerF
          title="DineBd Vendor Location Marker"
          position={markerLocation!}
          draggable
          onDragEnd={(e) => {
            const location = {
              lat: e.latLng?.lat() as number,
              lng: e.latLng?.lng() as number,
            };
            setMarkerLocation(location);
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/64/9407/9407510.png",
          }}
        />
      </GoogleMap>
    </>
  );
};

export default MapDirection;
