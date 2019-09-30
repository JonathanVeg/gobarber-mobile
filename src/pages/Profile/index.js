import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';

import { updateProfileRequest } from './../../store/modules/user/actions';
import { Container, Form, FormInput, Separator, SubmitButton, Title } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const dispatch = useDispatch();

  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    setPassword('');
    setPasswordConfirmation('');
    setOldPassword('');
  }, [profile]);

  function handleSubmit() {
    const data = {
      name,
      email,
      oldPassword,
      password,
      confirmPassword: passwordConfirmation,
    };

    dispatch(updateProfileRequest(data));
  }

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>

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
              oldPasswordRef.current.focus();
            }}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="send"
            value={oldPassword}
            onChangeText={setOldPassword}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => {
              passwordConfirmationRef.current.focus();
            }}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirma sua senha"
            ref={passwordConfirmationRef}
            returnKeyType="send"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
