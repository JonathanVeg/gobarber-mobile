import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import { signInRequest } from './../../store/modules/auth/actions';
import { Container, Form, FormInput, SignLink, SignLinkText, SubmitButton } from './styles';

export default function SignIn({navigation}) {
  const loading = useSelector(state => state.auth.loading);
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('112358');
  const dispatch = useDispatch();
  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
