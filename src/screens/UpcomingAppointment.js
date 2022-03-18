import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';

const UpcomingAppointment = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  const URL =
    'https://sihpaymentapis.herokuapp.com/getUpcomingTxns?uid=123412341234';

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setData(json);
      })
      .catch(err => {
        alert(err);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.UniqueBookingID}
            renderItem={({item}) => {
              return (
                <AppointmentCard
                  Date={item.DateOfAppointment}
                  Operator={item.OperatorID}
                  Service={item.Service}
                />
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UpcomingAppointment;
