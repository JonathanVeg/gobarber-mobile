import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn(params) {
  const {email, password} = params.payload;

  try {
    const response = yield call(api.post, 'sessions', {email, password});

    const {token, user} = response.data;

    yield put(signInSuccess(token, user));

    // history.push("/dashboard");
  } catch (e) {
    yield put(signFailure(`ERRO AO LOGAR, VERIFIQUE OS DADOS\n${e}`));
  }
}

const listeners = [takeLatest('@auth/SIGN_IN_REQUEST', signIn)];

export default all(listeners);
