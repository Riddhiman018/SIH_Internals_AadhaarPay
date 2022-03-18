import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import OverchargingCard from '../components/OverchargingCard';

const OverCharging = ({navigation}) => {
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
    'https://sihpaymentapis.herokuapp.com/cashTxn?uid=123412341234&booking_id=121220021647580474506';

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setData(json);
      })
      .catch(err => {
        if (err) {
          Alert.alert('No data found');
          console.log(err);
        }
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
            keyExtractor={item => item.UniqueCode}
            renderItem={({item}) => {
              return (
                <OverchargingCard
                  Amount={item.AmountToBePaid}
                  Operator={item.Operator_ID}
                  Service={item.Service}
                  Code={item.UniqueCode}
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
export default OverCharging;
