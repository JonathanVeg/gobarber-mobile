import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn(params) {
  const {email, password} = params.payload;

  try {
    const response = yield call(api.post, 'sessions', {email, password});

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (e) {
    yield put(signFailure(`ERRO AO LOGAR, VERIFIQUE OS DADOS\n${e}`));
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, 'users', {name, email, password});

    // history.push('/login');
  } catch (err) {
    Alert.alert('Mensagem', 'Falha no cadastro, verifique os dados');

    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

const listeners = [
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
];

export default all(listeners);
