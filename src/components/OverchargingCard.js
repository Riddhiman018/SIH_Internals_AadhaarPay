import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const OverchargingCard = props => {
  const navigation = useNavigation();

  const URL =
    'http://4896-14-139-187-71.ngrok.io/protection?uid=123412341234&OperatorID=Operator_1';

  const report = () => {
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        alert(res.Message);
        navigation.navigate('Home');
      });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.cardView}>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Amount</Text> :{'     '}
          {props.Amount}
        </Text>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Code</Text> :{'     '}
          {props.Code}
        </Text>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Service Selected</Text>:{'     '}
          {props.Service}
        </Text>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Operator</Text>:{'     '}{' '}
          {props.Operator}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Transaction Confirmed');
            navigation.navigate('Home');
          }}>
          <View style={styles.btnContinue}>
            <Text style={styles.textContinue}>Confirm Transaction</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Transaction Confirmed');
          navigation.navigate('Home');
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textOpera}>
            If Operator is Overcharging {'\n'}use protection Button
          </Text>
          <TouchableOpacity onPress={report}>
            <View style={styles.btnAlert}>
              <Text style={styles.textContinue}>Report Overcharging</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    backgroundColor: 'white',
    width: 360,
    height: 450,
    marginTop: 150,
    margin: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 18,
    fontWeight: '500',
    color: 'black',
  },
  hardCode: {
    fontWeight: 'bold',
  },
  btnContinue: {
    backgroundColor: '#2D54BB',
    width: 250,

    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    // margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  textContinue: {color: '#ffffff', alignItems: 'center'},
  btnAlert: {
    backgroundColor: '#CD0A0A',
    width: 250,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textOpera: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
});

export default OverchargingCard;
