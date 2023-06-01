import  'react-native-gesture-handler';
import { 
    Button,
    StyleSheet, 
    Text,
    View, 
    Alert, 
    Modal, 
    TextInput, 
    ScrollView,
    TouchableOpacity, 
    Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { showNotification, handleScheduleNotification, handleCancel    } from './Notifications';
import PushNotification from 'react-native-push-notification';


/** 
*  The Task component is responsible for creating, editing and deleting tasks.
*  it uses the state from the redux store to manage the tasks and the taskID
*  it also uses the AsyncStorage to save the tasks in the local storage
*  it makes use of the PushNotification library to schedule alarms for the tasks
* 
**/


function Task({navigation}) {
  // Get the state values for the tasks and taskID from the redux store
  const {tasks, taskID } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  // create local state variables for the task properties
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [location,setLocation] = useState('');
  const [done,setDone] = useState(false);
  const [color,setColor] = useState('white');
  const [showBellModal,setShowBellModal] = useState(false);
  const [bellTime,setBellTime] = useState('1');
  const [image,setImage] = useState('');
  

  // When the navigation focus event is fired
  useEffect(() => {
    navigation.addListener('focus',() => {
        getTask(); 
    }) 
  },[]);

  // function to fetch the task from the store
  const getTask = () => {
    const Task = tasks.find(task => task.ID === task.ID)
    if(Task){
        setTitle(Task.Title);
        setDesc(Task.Desc);
        setLocation(Task.Location);
        setDone(Task.Done);
        setColor(Task.Color);
        setImage(Task.Image);
    }
  }

  // function to schedule a task alarm 
  const setTaskAlarm = () => {

    PushNotification.localNotificationSchedule({
        channelId: "your-channel-id",
        title: title,  // title of the task
        message: desc.length != 0 ? desc : null ,   // message of the task, if no desc is provided, it's null
        bigText: location.length != 0 ? 'Location: ' + location : null,   // location of the task, if no location is provided, it's null
        //convert the time from minutes to milliseconds 
        date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
        color: 'red',   // color of the notification
        vibrate: true,  // enable vibration
        vibration: 300, // vibration duration
        allowWhileIdle: true,   // allow the notification even if the device is idle
    });
    if (bellTime > 0){
        Alert.alert("Success!","Reminder created for "+(bellTime)+" minute(s)");
    }
  };


  // function to set the task
  const setTask = () => {
    if (title.length == 0 ){
        Alert.alert(
          "Warning!","Please enter a valid title ",
          [{text:'Ok'}],{cancelable:false} 
        )
    }
    else{
        try{
            var Task ={
                ID : taskID,
                Title: title,
                Desc: desc,
                Location: location,
                Done: done,
                Color: color,
                Image: image,
            }
            // check if the task already exists in the tasks array, if it does, update it, otherwise add a new one
            const index = tasks.findIndex( task => task.ID === taskID );
            let newTasks = [];
            if( index > -1){
                newTasks = [...tasks];
                newTasks[index] =  Task;
            }
            else{
                newTasks = [...tasks, Task];
            }
            //save the tasks to the local storage
            AsyncStorage.setItem("Tasks",JSON.stringify(newTasks))
            .then (() =>{
                //update the tasks in the redux store
                dispatch(setTasks(newTasks));
                Alert.alert(
                    "Successful!","Task created successfully.",
                    [{text:'Ok'}],{cancelable:false} 
                )
                navigation.goBack();
            })
            .catch(error => console.log(error))
        }
        catch(error){
            console.log(error);
        }
    }
  }
 
  


//   const deleteImage = () => {
//     RNFS.unlink(image)
//     .then(() => {
//         const index = tasks.findIndex(task => task.ID === taskID);
//         if ( index > -1){
//             let newTasks = [...tasks];
//             newTasks[index].Image = '';
//             AsyncStorage.setItem('Tasks',JSON.stringify(newTasks))
//             .then(() => {
//                 dispatch(setTasks(newTasks));
//                 getTask();
//                 Alert.alert(
//                     "Success!","Image deleted.",
//                     [{text:'Ok'}],{cancelable:false} 
//                 )
//             })
//             .catch(error => console.log(error));
//         }
//     })
//     .catch(error => console.log(error));
//   }



  //render the UI
  return (
    <ScrollView>
        <View style = {styles.body}>
            <Text style = {styles.empty}>
                 {/* ...This was intentionally left empty... */}
            </Text>
        </View>
        <View style = {styles.body}>
            <Modal
                visible ={showBellModal}
                transparent
                onRequestClose={() => setShowBellModal(false)}
                animationType = 'slide'
                hardwareAccelerated 
            >
                <View style ={styles.center_view}>
                    <View style ={styles.bell_modal}>
                        <View style ={styles.bell_body}>
                            <Text style ={styles.text}>
                                Remind me in 
                            </Text>
                            <TextInput 
                                style ={[ styles.bell_input, {color: 'black'}]} 
                                keyboardType = 'numeric'
                                value= {bellTime}
                                onChangeText={(value) => setBellTime(value)}
                            />
                            <Text style ={styles.text}>
                                minute(s)
                            </Text>
                        </View>
                        <View style ={styles.bell_bottons}>
                        <TouchableOpacity style ={styles.cancel_button}  
                                onPress ={() => {setShowBellModal(false)}}>
                                <Text style ={styles.text}> 
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.save_button}   
                                onPress ={() => {setShowBellModal(false)
                                    setTaskAlarm()
                                }}
                            >
                                <Text style ={styles.text}> 
                                    Save
                                </Text>
                        </TouchableOpacity> 
                        </View>
                    </View>
                </View>
            </Modal>
        <TextInput
            value = {title} 
            style = {{ ...styles.input, color: 'black' }}
            placeholder = 'Title'
            placeholderTextColor="#808080"
            onChangeText = {(value) => setTitle(value)}
        />
        <TextInput
            value = {desc} 
            style = {{ ...styles.input1, color: 'black' }}
            placeholder = "Description"
            placeholderTextColor="#808080"
            multiline
            onChangeText = {(value) => setDesc(value)}
        /> 

        <View style={styles.inputContainer}>
            <FontAwesome5 
                name= {"map-pin"}
                size= {20}
                color= {"#000"}
            />
            <TextInput
                value={location} 
                style={{ ...styles.input2, color: 'black' }}
                placeholder= "Location"
                placeholderTextColor="#808080"
                onChangeText={ (value) => setLocation(value) }
            />
        </View>  

        <Text style = {styles.text}>

        </Text>

        <View style ={ styles.bar}>

            <TouchableOpacity style = {styles.white} onPress = {() => {
                setColor('white')
            }}>
                {color ==='white' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>

            <TouchableOpacity style = {styles.grey} onPress = {() => {
                setColor('grey')
            }}>
                {color ==='grey' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity> 

            <TouchableOpacity style = {styles.blue} onPress = {() => {
                setColor('blue')
            }}>    
                {color ==='blue' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>

            <TouchableOpacity style = {styles.color_red} onPress = {() => {
                setColor('color_red')
            }}>
                {color ==='color_red' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity> 
            
            <TouchableOpacity style = {styles.green} onPress = {() => {
                setColor('green')
            }}>
                {color ==='green' && 
                    <FontAwesome5
                        name=  {'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>    

        </View>

        <View style ={ styles.bar1}>

            <TouchableOpacity style = {styles.orange} onPress = {() => {
                setColor('orange')
            }}>
                {color ==='orange' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>

            <TouchableOpacity style = {styles.orange_1} onPress = {() => {
                setColor('orange_1')
            }}>
            {color ==='orange_1' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity> 

            <TouchableOpacity style = {styles.orange_2} onPress = {() => {
                setColor('orange_2')
            }}>    
                {color ==='orange_2' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>

            <TouchableOpacity style = {styles.orange_3} onPress = {() => {
                setColor('orange_3')
            }}>
                {color ==='orange_3' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity> 
            
            <TouchableOpacity style = {styles.light_blue} onPress = {() => {
                setColor('light_blue')
            }}>
                {color ==='light_blue' && 
                    <FontAwesome5
                        name={'check'}
                        size = {20}
                        color = '#000'
                    />
                }
            </TouchableOpacity>    

        </View>

        <Text style = {styles.text}>
         {/* ...This was intentionally left empty... */}
        </Text>

        <View style ={styles.notification_button}>
            <TouchableOpacity style ={styles.notification} onPress={ () => setShowBellModal(true) }>
            {/* // setShowBellModal(true)} */}

                <FontAwesome5
                    name={"bell"}
                    size = {25}
                    color = {'#fff'}
                />
            </TouchableOpacity>

            {/* <TouchableOpacity 
                style ={styles.notification} 
                onPress ={() => {navigation.navigate('Camera', { id:taskID })}}
            >
                <FontAwesome5
                    name={"camera"}
                    size = {25}
                    color = {'#fff'}
                />
            </TouchableOpacity> */}
        </View>

        {image ? 
            <View>
                <Image style ={ styles.image} source = {{ uri : image }}/>
                <TouchableOpacity 
                    style = {styles.delete_button}
                    onPress = {() => {deleteImage()}}
                >
                    name={"trash"}
                    size = {25}
                    color = {'#ff0000'}
                </TouchableOpacity>
            </View> :null
        }
        <View  style={styles.box}>
            <CheckBox 
                value ={done}
                onValueChange ={(newValue) => setDone(newValue)}

            />
            <Text style={styles.doned}>
                    Done
            </Text>
        </View>

        <TouchableOpacity  
            style = {styles.button2}
            onPress  = {setTask}
        >
                <Text style = {styles.text} >
                    Save Task
                </Text>

        </TouchableOpacity>

        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignItems: 'center',
    },
    empty:{
        color: '#000',
        fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: "normal",
    },
    text:{
        color: '#000',
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: "bold",
    },
    text_color: {
        color: "#000",
    },
    image:{
        width: 300,
        height: 300,
        margin: 20,
    },
    save_text: {
        color: '#000',
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: "normal",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', 
    },
    save_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    input:{
        width: '94%',
        height: 60,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: "#fff",
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        paddingHorizontal: 10,
        margin: 10,
    },
    input1:{
        width: '94%',
        height: 70,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: "#fff",
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        paddingHorizontal: 10,
        margin: 10,
    },
    input2:{
        width: '90%',
        height: 70,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: "#fff",
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        paddingHorizontal: 10,
        margin: 10,
    },
    bell_input:{
        width: 70,
        borderWidth: 1,
        borderColor: "#808080",
        backgroundColor: "#fff",
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        margin: 10
    },
    box: {
        flexDirection: "row",
        margin: 10,
    },
    doned:{
        color: '#000',
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",

    },
    center_view:{
        flex : 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: "center",

    },
    bell_modal:{
        width: 300,
        haeight:200,
        backgroundColor: '#ffff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
    },
    bar:{
        flexDirection: "row",
        height: 40,
        width:'90%',
        borderWidth:2,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderTopColor:'#000',
    },
    bar1:{
        flexDirection: "row",
        height: 40,
        width:'90%',
        borderWidth:2,
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomColor:'#000',
        borderTopColor: '#C5C5C5'
    },
    white:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "'#ffff",
        borderTopLeftRadius:10,
    },
    grey:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#808080",
    },
    blue:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0080ff",
    },
    color_red:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff0000",
    },
    orange:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFC55C",
        borderBottomLeftRadius: 10,
    },
    orange_1:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFA500",
    },
    orange_2:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FD7F20",
    },
    orange_3:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#6D5440",
    },
    light_blue:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ADD8E6",
        borderBottomRightRadius: 10,
    },
    green:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00FF00",
        borderTopRightRadius: 10,
    },
    bell_body:{
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    cancel_button:{
        flex: 1,
        borderWidth: 1,
        borderColor: '#ff0000',
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#ff0000',
    },
    save_button:{
        flex: 1,
        borderWidth: 1,
        borderColor: '#0080ff',
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#0080ff'
    },
    button:{
        backgroundColor: "#0080ff",
        width: '100%',
        height: 20,
        fontFamily:'Arial',
        fontSize:10,
        borderRadius: 10,
    },
    button2: {
        flex:1,
        height: 60,
        width: '70%',
        backgroundColor: "#0080ff",
        borderRadius: 20,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems:"center",
    },
    notification_button:{
        flexDirection: "row",
        marginVertical: 10,
        width: '93%',
    },
    notification:{
        flex:1,
        height: 50,
        backgroundColor: "#0080ff",
        borderRadius: 20,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems:"center",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bell_bottons:{
        flexDirection: "row",
        height: 50,
    },
    save_item_button: {
        height: 50,
        width: '50%',
        backgroundColor: "#0080ff",
        borderRadius: 20,
    },
    delete_button:{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems:"center",
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: "#808080",
        margin: 10,
        borderRadius: 10,
    }
});
export default Task;