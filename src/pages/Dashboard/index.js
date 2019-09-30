import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
import api from '~/services/api';

import { signOut } from './../../store/modules/auth/actions';
import { Container, List, Title } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('/appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`/appoitments/${id}`);

    setAppointments(
      appointments.map(a =>
        a.id === id ? {...a, canceled_at: response.data.canceled_at} : a,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <TouchableOpacity
          onPress={() => {
            dispatch(signOut());
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>SAIR</Text>
        </TouchableOpacity>

        <List
          data={appointments}
          keyExtractor={item => String(Math.random())}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
