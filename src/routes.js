import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './pages/Dashboard';
import Confirm from './pages/NewSchedule/Confirm';
import SelectDateTime from './pages/NewSchedule/SelectDateTime';
import SelectProvider from './pages/NewSchedule/SelectProvider';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({SignIn, SignUp}),
        App: createSwitchNavigator({
          New: {
            screen: createStackNavigator(
              {
                SelectProvider,
                SelectDateTime,
                Confirm,
              },
              {
                defaultNavigationOptions: {
                  headerTransparent: true,
                  headerTintColor: '#FFF',
                  headerLeftContainerStyle: {
                    marginLeft: 20,
                  },
                },
              },
            ),

            navigationOptions: {
              tabBarVisible: false,
              tabBarLabel: 'Agendar',
            },
          },
          Profile,
          Dashboard,
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
