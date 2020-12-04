import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { ICustomer, icon, IAddress } from '../../pages/Dashboard';

interface MarkersProps {
  customers: ICustomer[];
  lat?: number;
  lng?: number;
  address: IAddress | undefined;
}

const MarkersCustumers: React.FC<MarkersProps> = ({
  customers,
  lat,
  lng,
  address,
}) => {
  const markers = customers.map((item, i) => (
    <Marker
      key={parseInt(i.toString())}
      position={{ lat: item.lat, lng: item.lng }}
      icon={icon}
    >
      <Popup>
        {item.name} {item.weight}
      </Popup>
    </Marker>
  ));

  return (
    <>
      {markers}
      {lat && lng && (
        <Marker position={{ lat, lng }} icon={icon}>
          <Popup>
            {address?.road} {address?.city} {address?.country}
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MarkersCustumers;
