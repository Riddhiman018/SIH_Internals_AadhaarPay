import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Button,
  BackHandler,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');

const PaymentScreen = () => {
  const navigation = useNavigation();

  const onPayment = () => {
    Linking.openURL(
      'https://sihpaymentapis.herokuapp.com/digitalPayment?uid=123412341234&booking_id=121220021647562678931&Operator_ID=Operator_1',
    );
  };

  function handleBackButtonClick() {
    navigation.navigate('Home');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={onPayment}>
          <View>
            <Image
              source={{uri: 'https://i.ibb.co/s1fJ9h6/Ellipse-10.png'}}
              style={{
                justifyContent: 'center',
                marginTop: 200,
                height: 150,
                width: 150,
                marginLeft: 120,
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Over');
          }}>
          <View>
            <Image
              source={{uri: 'https://i.ibb.co/C9jW9cG/Ellipse-7.png'}}
              style={{
                justifyContent: 'center',
                marginTop: 400,
                height: 150,
                width: 150,
                marginLeft: 120,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // cardView: {
  //   flex: 1,
  //   width: width - 20,
  //   height: height / 5,
  //   backgroundColor: 'white',
  //   margin: 10,
  //   borderRadius: 5,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0.5, height: 0.5},
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  //   elevation: 4,
  // },

  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 500,
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  textContinue: {color: 'black', alignItems: 'center', marginTop: 5},
});

export default PaymentScreen;
