import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

function Splash({navigation}){

  useEffect(() => {
      createChannel();
      setTimeout(()=>{
          navigation.navigate('My Task');
      }, 2000);
  }, []);

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "your-channel-id",
        channelName: "Your channel name",
        importance: 4,
      },
      (created) => console.log("channel created", created),
    );
  }

  return (
      <View style= {styles.body}>
          <Text style = {styles.text}>
              TaskUp
          </Text>
      </View>
    )
}


const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#0074E7', 
      alignItems:'center',
      justifyContent: 'center'
    },
    text: {
      fontFamily: 'Arial',
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: 'bold',
      color: '#fff',
      margin: 5,
    },

  });
  export default Splash;