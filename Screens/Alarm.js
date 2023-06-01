// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput } from 'react-native';
// import Alarm from 'react-native-alarm-notification';

// function AlarmScreen() {
//     const [alarmTime, setAlarmTime] = useState('');

//     const setAlarm = () => {
//         Alarm.createAlarm(alarmTime);
//     }

//     return (
//         <View>
//             <Text>Enter the time for the alarm (HH:mm):</Text>
//             <TextInput 
//                 value={alarmTime}
//                 onChangeText={text => setAlarmTime(text)}
//             />
//             <TouchableOpacity onPress={setAlarm}>
//                 <Text>Set Alarm</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// export default AlarmScreen;
