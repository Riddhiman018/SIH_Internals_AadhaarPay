import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const ProfileItem = ({item}) => {
  return (
    <View>
      <View>
        <View style={styles.cardView}>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 16,
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <Text style={styles.textView}>Aadhaar Number: {item.aadhar}</Text>
          <Text style={styles.textView}>Date of birth: {item.DOB}</Text>
          <Text style={styles.textView}>Address: {item.address}</Text>
          <Text style={styles.textView}>Sex: {item.sex}</Text>
          <View style={{borderTopWidth: 1}}>
            <Text style={{color: 'blue', textAlign: 'center', paddingTop: 30}}>
              Powered by AePS
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  cardView: {
    //flex: 1,
    borderWidth: 1,
    borderColor: '#252525',
    borderStyle: 'solid',
    width: width - 20,
    height: height / 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    margin: 1,
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },

  textView: {
    color: 'black',
    fontSize: 16,
    top: 10,
    bottom: 10,
    margin: 10,
    left: 0,
    fontFamily: 'Roboto',
  },
});
