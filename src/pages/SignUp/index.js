import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import { signUpRequest } from './../../store/modules/auth/actions';
import { Container, Form, FormInput, SignLink, SignLinkText, SubmitButton } from './styles';

export default function SignIn({navigation}) {
  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState('Jonathan');
  const [email, setEmail] = useState('user2@gmail.com');
  const [password, setPassword] = useState('112358');

  const dispatch = useDispatch();

  const passwordRef = useRef();
  const emailRef = useRef();

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
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
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <SignLinkText>Entrar</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
