import React, { FormEvent, useCallback, useState, useEffect } from 'react';
import { Icon, LeafletMouseEvent } from 'leaflet';
import { FaTrash } from 'react-icons/fa';
import { TileLayer, Map } from 'react-leaflet';
import axios from 'axios';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import MarkerCustomer from '../../components/Marker';

import {
  Container,
  ContainerCustomers,
  Field,
  FormContent,
  GeoLocationField,
  ButtonSave,
  ButtonReset,
  ButtonResetContent,
  ButtonDelete,
} from './styles';

export const icon = new Icon({
  iconUrl: '/icon.svg',
  iconSize: [35, 35],
  iconAnchor: [17, 46],
  popupAnchor: [-3, -50],
});

export interface ICustomer {
  name: string;
  street: string;
  city: string;
  country: string;
  weight: number;
  lat: number;
  lng: number;
}

export interface IPosition {
  lat: number | undefined;
  lng: number | undefined;
}

export interface IAddress {
  road: string;
  city_district: string;
  city: string;
  municipality: string;
  county: string;
  state_district: string;
  state: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}

const Dashboard: React.FC = () => {
  const { addToast, messages } = useToast();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [address, setAddress] = useState<IAddress>();
  const [position, setPosition] = useState<IPosition>({
    lat: undefined,
    lng: undefined,
  });

  const [state] = useState({
    currentLocation: { lat: -23.541, lng: -46.584 },
    zoom: 15,
    data,
  });

  const getLocation = useCallback(async (event: LeafletMouseEvent) => {
    setPosition({
      lat: parseFloat(event.latlng.lat.toFixed(7)),
      lng: parseFloat(event.latlng.lng.toFixed(7)),
    });
  }, []);

  useEffect(() => {
    api
      .get('customer')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: error.message,
        });
      });
  }, [addToast]);

  useEffect(() => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`,
      )
      .then(results => {
        const dataAddress = results.data.address;

        setAddress({
          road: dataAddress.road,
          city_district: dataAddress.city_district,
          city: dataAddress.city,
          municipality: dataAddress.municipality,
          county: dataAddress.county,
          state_district: dataAddress.state_district,
          state: dataAddress.state,
          region: dataAddress.region,
          postcode: dataAddress.postcode,
          country: dataAddress.country,
          country_code: dataAddress.country_code,
        });
      });
  }, [position]);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const dataForm = {
        name,
        street: address?.road,
        city: address?.city,
        state: address?.state,
        country: address?.country,
        weight,
        lat: position.lat,
        lng: position.lng,
      };

      try {
        const response = await api.post('customer', dataForm);

        setData([...data, response.data]);

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Cadastro realizado com sucesso!',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: 'Ocorreu um problema no cadastro!',
        });
      }
    },
    [name, weight, position, address, data, addToast],
  );

  const handleResetForm = useCallback(() => {
    setName('');
    setWeight('');
    setPosition({
      lat: undefined,
      lng: undefined,
    });
  }, []);

  const deleteCustomer = useCallback(
    async (id: string) => {
      try {
        await api.delete(`customer/${id}`);

        const response = await api.get('customer');
        setData(response.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: error.message,
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Container zIndex={!!messages.length}>
        <FormContent>
          <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <Field>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <input
                type="text"
                placeholder="Peso da Entrega"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                required
              />
            </Field>
            {/* <Field>
              <InputSearch>
                <input
                  type="text"
                  placeholder="Endereço Cliente"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <button type="button" onClick={getLocation}>
                  buscar
                </button>
              </InputSearch>
            </Field> */}
            <Field>
              <GeoLocationField>
                <input
                  type="text"
                  placeholder="latitude"
                  value={position.lat}
                  disabled
                />
                <input
                  type="number"
                  placeholder="longitude"
                  value={position.lng}
                  disabled
                />
              </GeoLocationField>
            </Field>

            <ButtonSave type="submit">cadastrar</ButtonSave>
          </form>
          <ButtonResetContent>
            <ButtonReset type="button" onClick={handleResetForm}>
              Resetar
            </ButtonReset>
          </ButtonResetContent>
        </FormContent>

        <Map
          center={state.currentLocation}
          zoom={state.zoom}
          onclick={getLocation}
          style={{
            width: 800,
            height: 480,
            borderWidth: 5,
            borderRadius: 10,
            marginTop: 60,
            marginLeft: 30,
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerCustomer
            customers={data as ICustomer[]}
            address={address}
            lat={position.lat}
            lng={position.lng}
          />
        </Map>
      </Container>
      <ContainerCustomers>
        {data.length > 0 && (
          <div>
            <p>Total de clientes: 15; Peso Total: Ticket Médio*: 301,4</p>
            <table>
              <thead>
                <th>Nome</th>
                <th>Rua</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Pais</th>
                <th>Peso</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>Ações</th>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.street}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.country}</td>
                    <td>{item.weight}</td>
                    <td>{item.lat}</td>
                    <td>{item.lng}</td>
                    <td>
                      <ButtonDelete
                        type="button"
                        onClick={() => deleteCustomer(item._id)}
                      >
                        <FaTrash color="#ffff" size={18} />
                      </ButtonDelete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ContainerCustomers>
    </>
  );
};

export default Dashboard;
