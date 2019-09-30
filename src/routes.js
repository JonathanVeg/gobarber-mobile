import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({SignIn, SignUp}),
        App: createSwitchNavigator({Profile, Dashboard, Profile}),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
