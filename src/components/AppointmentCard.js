import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const AppointmentCard = props => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.cardView}>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Appointment Date</Text> :{'     '}
          {props.Date}
        </Text>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Service Selected</Text>:{'     '}
          {props.Service}
        </Text>
        <Text style={styles.textView}>
          <Text style={styles.hardCode}>Operator</Text>:{'     '}{' '}
          {props.Operator}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    backgroundColor: 'white',
    width: 360,
    height: 250,
    marginTop: 200,
    margin: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
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
});
