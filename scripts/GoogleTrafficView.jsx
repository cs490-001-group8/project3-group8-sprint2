import React from 'react';
import GoogleMapReact from 'google-map-react';
import WidgetTitle from './WidgetTitle';

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

const getAPIkey = () => (
    process.env.GOOGLE_MAP_API_KEY
);

export default function GoogleTrafficView() {
    return (
        <div className="widget">
            <WidgetTitle title="Traffic" />
            <GoogleMapReact
              bootstrapURLKeys={{
                    key: getAPIkey(),
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
