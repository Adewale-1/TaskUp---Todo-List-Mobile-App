// Import the react-native-gesture-handler library to enable gesture-based interactions in the app
import 'react-native-gesture-handler';

// Import the React library and the useState hook
import React,{useState} from 'react';

// Import the component files for the different screens in the app
import Splash from './Splash';
import ToDo from './ToDo';
import Done from './Done';
import Task from './Task';
// import AlarmScreen from './Alarm';

// Import the Provider component from the react-redux library to make the Redux store available to the app
import { Provider } from 'react-redux'

// Import the Redux store that was created in the store.js file
import { Store } from '../redux/store';

// Import the NavigationContainer component from the @react-navigation/native library to enable navigation in the app
import { NavigationContainer } from '@react-navigation/native';

// Import the FontAwesome5 icon library
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Import the createBottomTabNavigator function from the @react-navigation/bottom-tabs library to create a bottom tab navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import the createStackNavigator function and the Header component from the @react-navigation/stack library to create a stack-based navigation
import { createStackNavigator, Header } from '@react-navigation/stack';



// Use the createBottomTabNavigator function to create a bottom tab navigator component
const Tab = createBottomTabNavigator(); 

// Define the HomeTabs component that renders the bottom tab navigator
function HomeTabs(){ 
  return (
    // Wrap the tab navigator in a Provider component to make the Redux store available to the app
    <Provider store = {Store} > 
      <Tab.Navigator
        // Use the screenOptions prop to specify the options for the tab icons
        screenOptions={({route})=>({  
        // Use a function to determine the icon for each tab based on the route name
        tabBarIcon:({focused , size, color})=>{   
          let iconName;
          // If the route name is 'To-Do', set the icon to a list icon and the size and color based on the focused prop
          if (route.name === 'To-Do'){ 
            iconName = 'th-list'; 
            size = focused ? 30 : 25; 
            color = focused ? '#000' : '#808080';  
          }
          // If the route name is 'Done', set the icon to a checkmark icon and the size and color based on the focused prop
          else if (route.name === 'Done'){
            iconName = 'check';
            size = focused ? 30 : 25;
            color = focused ? '#000' : '#808080';
          }
          // Use the FontAwesome5 component to render the icon
          return (
            <FontAwesome5  
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
        })
      }
      > 
        <Tab.Screen name = 'To-Do' component={ToDo} options={{header:()=> null}}/> 
        
        <Tab.Screen name = 'Done' component={Done} options={{header:()=> null}}/>
      </Tab.Navigator> 
    </Provider>
  )
}

// Use the createStackNavigator function to create a stack-based navigator componen
const RootStack= createStackNavigator(); 

// Define the App component that renders the navigator
function App(){
  return( 
    // Wrap the navigator in a Provider component to make the Redux store available to the app  
    <Provider store = {Store}> 
    
      <NavigationContainer>
        
        <RootStack.Navigator initialRouteName='Splash '> 
          <RootStack.Screen name = 'Splash' component={Splash} options={{header:()=>null}}/>
          <RootStack.Screen name = 'My Task' component={HomeTabs} options={{header:()=>null}}/>
          <RootStack.Screen name = 'Task' component={Task}  />
          {/* <RootStack.Screen name = 'AlarmScreen' component={AlarmScreen} /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


// Export the App component as the default export
export default App;
