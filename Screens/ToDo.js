// Import the react-native-gesture-handler, React, and useState, useEffect hooks
import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';

// Import the FontAwesome5 icon library
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Import various components from the react-native library
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

// Import the useDispatch and useSelector hooks from the react-redux library
import { useDispatch, useSelector } from 'react-redux';

// Import the setTaskID and setTasks action creators from the actions.js file
import { setTaskID, setTasks } from '../redux/actions';

// Import the AsyncStorage module from the @react-native-async-storage/async-storage library
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the ToDo component
function ToDo({navigation}){
    // Use the useSelector hook to access the tasks in the Redux store
    const {tasks} = useSelector(state => state.taskReducer);
    // Use the useDispatch hook to create a dispatch function that can be used to trigger actions
    const dispatch = useDispatch();

    // Use the useEffect hook to get the tasks from AsyncStorage when the component mounts
    useEffect(() => {
      getData();  
    },[]);

    // Define the getData function that retrieves the tasks from AsyncStorage and dispatches the setTasks action
    const getData = () => {
      AsyncStorage.getItem('Tasks')
        .then (tasks => {
          // Parse the tasks from the JSON string
          const parsedTasks = JSON.parse(tasks);
          // If the parsed tasks are an object, dispatch the setTasks action with the parsed tasks as the payload
          if( parsedTasks && typeof parsedTasks ==='object'){
            dispatch(setTasks(parsedTasks));
          }
        })
        // Log any errors that occur while getting the tasks from AsyncStorage
        .catch(error => console.log(error))
    }

    // Define the onPressHandler function that dispatches the setTaskID action and navigates to the 'Task' screen
    const onPressHandler =()=>{
      dispatch(setTaskID(tasks.length + 1))
      navigation.navigate('Task');
    }
    
    
    // Define the checkTask function that updates the Done property of a task in the tasks array and saves the updated tasks to AsyncStorage
    const checkTask =(id) => {
      // Find the index of the task with the specified ID
      const index = tasks.findIndex(task => tasks.ID === id);
      // If the task with the specified ID exists, update its Done property and save the updated tasks to AsyncStorage
      if(index > -1){
        let newTasks  = [...tasks];
        newTasks[index].Done = newValue;
        AsyncStorage.setItem("Tasks", JSON.stringify(newTasks))
        .then(()=>{
          // Dispatch the setTasks action with the updated tasks as the payload
          dispatch(setTasks(newTasks));
          // Show an alert to confirm that the task has been deleted
          Alert.alert(
            "Success!","Task Deleted",
            [{text:'Ok'}],{cancelable:false} 
          )
        })
        // Log any errors that occur while saving the updated tasks to AsyncStorage
        .catch(error => console.log(error))
      }
    }
    // Define the deleteTask function that removes a task from the tasks array and saves the updated tasks to AsyncStorage
    const deleteTask = (id) => {
      // Create a new array with all tasks except the task with the specified
      const filteredTasks = tasks.filter(task => task.ID !== id);
      // Set the 'Tasks' item in AsyncStorage to the stringified version of the filtered tasks array
      AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then (() =>{
        // Dispatch the setTasks action with the filtered tasks as the payload
        dispatch(setTasks(filteredTasks));
        // Show an alert to confirm that the task has been deleted
        Alert.alert(
          "Success!","Task Deleted",
          [{text:'Ok'}],{cancelable:false} 
        )
      })
      // Log any errors that occur while saving the updated tasks to AsyncStorage
      .catch(error => console.log(error))
    }
    // Render the ToDo screen
    return(
        // Use a View component to contain the rest of the UI elements
        <View style={styles.body}>
          {/* Use a FlatList component to render a list of tasks */}
          <FlatList
            // Set the data prop to an array of tasks with the Done property set to false
            data = {tasks.filter(task => task.Done === false)}
            // Use the renderItem prop to render a list item for each task
            renderItem = {({ item }) => (
              // Use a TouchableOpacity component to make the list items pressable
              <TouchableOpacity style = {styles.list} onPress={()=>{
                // Dispatch the setTaskID action with the task's ID as the payload when the list item is pressed
                dispatch(setTaskID(item.ID));
                // Navigate to the 'Task' screen when the list item is pressed
                navigation.navigate('Task');
              }}>
                {/* Use a View component to contain the task's color bar and description */}
                <View style ={styles.move_right}>
                  {/* Use a View component to render the task's color bar*/}
                  <View 
                    style = {[ {
                      // Use a ternary operator to set the background color of the View based on the task's Color property
                      backgroundColor: 
                        item.Color ==='color_red' ? "#ff0000" :
                        item.Color === 'grey' ? "#808080" : 
                        item.Color === 'green' ? "#00FF00" :
                        item.Color === 'blue' ? "#0080ff" :
                        item.Color === 'orange' ? "#FFC55C" :
                        item.Color === 'orange_1' ? "#FFA500" :
                        item.Color === 'orange_2' ? "#FD7F20" :
                        item.Color === 'orange_3' ? "#6D5440" : 
                        item.Color === 'light_blue' ? "#ADD8E6" : '#fff' 
                    }, styles.color]}
                  />
                  {/* Use a View component to render the task's title and description */}
                  <View style ={styles.move_body}>
                    {/*Use a Text component to render the task's title*/}
                    <Text style={styles.header} numberOfLines ={1}>
                      {item.Title}
                    </Text>
                    {/* Use a Text component to render the task's description */}
                    <Text style={styles.subheader}  numberOfLines ={1}>
                      {item.Desc}
                    </Text>
                    <View style={[ {
                          backgroundColor: 
                            item.Color ==='color_red' ? "#ff0000" :
                            item.Color === 'grey' ? "#808080" : 
                            item.Color === 'green' ? "#00FF00" :
                            item.Color === 'blue' ? "#0080ff" :
                            item.Color === 'orange' ? "#FFC55C" :
                            item.Color === 'orange_1' ? "#FFA500" :
                            item.Color === 'orange_2' ? "#FD7F20" :
                            item.Color === 'orange_3' ? "#6D5440" : 
                            item.Color === 'light_blue' ? "#ADD8E6" : '#fff' 
                        },styles.inputContainer ]}
                    >
                      <FontAwesome5 
                          name= {"map-pin"}
                          size= {20}
                          color= {"#000"}
                      />
                      <Text style={styles.subheader1} >
                        {item.Location}
                      </Text>

                    </View> 
                  </View>

                  <TouchableOpacity onPress={() => { deleteTask(item.ID) }}>
                    {/*Use a FontAwesome5 Icon component to render a trash icon*/}
                    <FontAwesome5
                      name = {'trash'}
                      size = {25}
                      color = {'#ff3636'}
                    />
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            )}
            // Set the keyExtractor prop to a function that returns the ID of each task as the key
            keyExtractor = {( item, index)=> index.toString()}
          />
          <TouchableOpacity
            // Define the style for the addTask button
            style = {styles.button}
            // Define the behavior for when the button is pressed
            onPress={onPressHandler} 
          >
           {/* Use a FontAwesome5 Icon component to render a
            plus icon inside the button */}
            < FontAwesome5
              name = {'plus'}
              size= {30}
              color = {'#fff'}
            />
          </TouchableOpacity>
        </View>
    )
}


// Define the styles for the ToDo screen
const styles = StyleSheet.create({
    body: {
      flex: 1, 
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
      marginVertical: 7,
      paddingRight: 10,
      backgroundColor: "#ffff",
      justifyContent: 'center',
      elevation: 5,
      borderRadius: 10,

    },
    header:{
      fontFamily: 'Arial',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
      // margin:5,
    },
    subheader:{
      fontFamily: 'Arial',
      fontSize: 19,
      color: '#000',
      margin:5,
    },
    subheader1:{
      fontFamily: 'Arial',
      fontSize: 12,
      color: '#000',
      margin:5,
    },
    move_right:{
      flexDirection: 'row',
      alignItems: "center",
    },
    move_body:{
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomRightRadius: 50,
      borderTopRightRadius: 50,
      height: 56
    },
    color:{
      width: 20,
      height: 131,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
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
  export default ToDo;