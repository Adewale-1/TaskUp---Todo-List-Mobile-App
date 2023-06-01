import 'react-native-gesture-handler';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text, 
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';



function Done({navigation}){

    const {tasks} = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();



    const onPressHandler =()=>{
      dispatch(setTaskID(tasks.length + 1))
      navigation.navigate('Task');
    }
    

    const checkTask =(id) => {
      const index = tasks.findIndex(task => tasks.ID === id);
      if(index > -1){
        let newTasks  = [...tasks];
        newTasks[index].Done = newValue;
        AsyncStorage.setItem("Tasks", JSON.stringify(newTasks))
        .then(()=>{
          dispatch(setTasks(newTasks));
          Alert.alert(
            "Success!","Task Deleted",
            [{text:'Ok'}],{cancelable:false} 
          )
        })
        .catch(error => console.log(error))
      }
    }

    const deleteTask = (id) => {
      const filteredTasks = tasks.filter(task => task.ID !== id);
      AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then (() =>{
        dispatch(setTasks(filteredTasks));
        Alert.alert(
          "Success!","Task Deleted",
          [{text:'Ok'}],{cancelable:false} 
        )
      })
      .catch(error => console.log(error))
    }

    return(
        <View style={styles.body}>
          <FlatList
            data = {tasks.filter(task => task.Done === true)}
            renderItem = {({ item }) => (
              <TouchableOpacity style = {styles.list} onPress={()=>{
                dispatch(setTaskID(item.id));
                navigation.navigate('Task');
              }}>
                <View style ={styles.move_right}>
                  <CheckBox 
                    value = {item.Done}
                    onValueChange ={(newValue) => {checkTask(item.ID,newValue)}}/
                  >
                  <View style ={styles.move_body}>
                    <Text style={styles.header} numberOfLines ={1}>
                      {item.Title}
                    </Text>
                    <Text style={styles.subheader}  numberOfLines ={1}>
                      {item.Desc}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => { deleteTask(item.ID) }}>
                    <FontAwesome5
                      name = {'trash'}
                      size = {25}
                      color = {'#ff3636'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor = {( item, index)=> index.toString()}
          />
   
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
      flex: 1, 
      backgroundColor: "#E8EAED",
    },
    text: {
      fontFamily: 'Arial',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 'bold',
      color: '#000000',
      margin: 5,
    },
    input: {
      width: 380,
      height: 46,
      borderColor: '#000000',
      borderWidth: 2,
      borderRadius: 20,
      color: '#000000',
      fontSize: 20,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
      margin: 10,
    },
    list:{
      marginHorizontal: 10,
      marginVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      justifyContent: 'center',
      elevation: 5,
      borderRadius: 10,

    },
    header:{
      fontFamily: 'Arial',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
      margin:5,
    },
    subheader:{
      fontFamily: 'Arial',
      fontSize: 19,
      color: '#808080',
      margin:5,
    },
    move_right:{
      flexDirection: 'row',
      alignItems: "center",
    },
    move_body:{
      flex: 1,
    },
    button:{
      width:80,
      height:80,
      backgroundColor: "#0080ff",
      borderRadius:50,
      borderColor: '#0080ff',
      justifyContent: "center",
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      right: 10,
      elevation: 5,
    }
  });
  export default Done;