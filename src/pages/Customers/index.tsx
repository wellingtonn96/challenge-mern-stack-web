import React, { useEffect, useState, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import Header from '../../components/Header';
import api from '../../services/api';

import { Container, ButtonDelete } from './style';

const Customers: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('customer')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const deleteCustomer = useCallback(async (id: string) => {
    try {
      await api.delete(`customer/${id}`);

      const response = await api.get('customer');
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1>Listagem de clientes</h1>
        {data.length > 0 ? (
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
                        <FaTrash color="red" size={18} />
                      </ButtonDelete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Nenhum item cadastrado</p>
        )}
      </Container>
    </>
  );
};

export default Customers;
