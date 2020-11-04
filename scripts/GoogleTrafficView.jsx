import React from 'react';
import GoogleMapReact from 'google-map-react';

const createMapOptions = () => ({
  panControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  styles: [
    {
      stylers: [{ saturation: -100 }, { gamma: 0.8 },
        { lightness: 4 },
        { visibility: 'on' }],
    },
  ],
});

export default function GoogleTrafficView({ myName, loggedIn }) {
  return (
    <div style={{ height: '60vh', width: '40%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCazVH5o22VYBnDJzQ6wa7JtBAz7y8jHao',
          language: 'en',
          region: 'us',
        }}
        defaultCenter={{ lat: 40.560806, lng: -74.465591 }}
        defaultZoom={9}
        layerTypes={['TrafficLayer']}
        options={createMapOptions}
      />
    </div>
  );
}