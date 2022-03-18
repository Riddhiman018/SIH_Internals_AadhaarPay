import React, {useEffect} from 'react';
import {View, Text, Alert, logoutlogout, Image, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import HomeScreen from './src/components/HomeScreen';
import {InputOTPScreen} from './src/components/InputOTPScreen';
import {Authentication} from './src/components/Authentication';
import BookAppointment from './src/components/BookAppointment';
import Fingerprint from './src/screens/Fingerprint';
import PaymentScreen from './src/screens/PaymentScreen';
import UpcomingAppointment from './src/screens/UpcomingAppointment';
import OverCharging from './src/screens/OverCharging';
import {useBackHandler} from '@react-native-community/hooks';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 150, height: 50}}
      source={require('./src/assets/consts/AEPS.jpeg')}
    />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: props => <LogoTitle {...props} />,
            headerBackVisible: false,
            headerRight: () => (
              <Button
                icon="logout"
                onPress={() => {
                  Alert.alert('', 'Are you sure you want to logout?', [
                    {
                      text: 'No',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => navigation.navigate('Authentication'),
                    },
                  ]);
                  return true;
                }}
                labelStyle={{fontSize: 30}}
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="InputOTP"
          component={InputOTPScreen}
          options={({navigation}) => ({
            headerLeft: () => (
              <Button
                onPress={() =>
                  navigation.navigate('Authentication', {
                    screen: 'Authentication',
                  })
                }
                icon="arrow-left"
                labelStyle={{fontSize: 30, marginRight: 180}}
                color="black"
              />
            ),
            headerTitle: props => <LogoTitle {...props} />,
            headerBackVisible: false,
            headerTintColor: 'white',
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="Book"
          component={BookAppointment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Finger"
          component={Fingerprint}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pay"
          component={PaymentScreen}
          options={{
            title: 'Payment',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2D55BB',
            },
          }}
        />
        <Stack.Screen
          name="Upcoming"
          component={UpcomingAppointment}
          options={{
            title: 'Upcoming Appointment',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2D55BB',
            },
          }}
        />
        <Stack.Screen
          name="Over"
          component={OverCharging}
          options={{
            title: 'Cash Payment',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2D55BB',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
