import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

export default function GoogleMap({
  center,
  zoom,
  location,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  location: google.maps.LatLngLiteral;
}){
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!ref.current) return
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    new google.maps.Marker({
      position: location,
      map,
    })
  },[[ref,center,zoom,location]])


  return <Map ref={ref}/>
}

const Map = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`
