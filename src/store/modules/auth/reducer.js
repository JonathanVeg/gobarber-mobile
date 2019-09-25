import produce from 'immer';
import { Alert } from 'react-native';

const INITIAL_STATE = {token: null, signed: false, loading: false};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_FAILURE': {
        Alert.alert('Erro no login', action.payload.message);

        draft.token = action.payload.token;
        draft.loading = false;

        break;
      }

      case '@auth/LOGOUT': {
        draft.token = '';
        draft.signed = false;

        break;
      }

      default:
    }
  });
}
