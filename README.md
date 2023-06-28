# TaskUp Application

TaskUp is a simple task management application built on React Native. It allows users to create, edit, and delete tasks. It also has an alarm feature to remind users of their tasks. The application uses Redux for state management and AsyncStorage for local storage.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js, npm and React Native installed on your machine. 

To check if you have Node.js installed, run this command in your terminal:

```
node -v
```

To confirm that you have npm installed you can run this command in your terminal:

```
npm -v
```

To install React Native, follow the instructions on [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

### Installing

Clone the repository to your local machine.

```
git clone https://github.com/<your-github-username>/TaskUp.git
```

Navigate into the cloned repository.

```
cd TaskUp
```

Install all the dependencies.

```
npm install
```

Run the application.

```
npx react-native run-android
```

## Built With

* [React Native](https://reactnative.dev/) - A framework for building native apps using React
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
* [React Navigation](https://reactnavigation.org/) - Routing and navigation for your React Native apps
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - An asynchronous, unencrypted, persistent, key-value storage system for React Native.
* [React Native Push Notification](https://github.com/zo0r/react-native-push-notification) - A react native module to send local and remote push notifications
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Customizable Icons for React Native

## Code Overview

### App.js

This is the root component of the application. It sets up the navigation stack and the Redux store.

### Splash.js

This is the splash screen component. It displays a welcome message and navigates to the task list after a set amount of time.

### Task.js

This is the task component. It is responsible for creating, editing and deleting tasks. It uses the state from the Redux store to manage the tasks and the taskID. It also uses AsyncStorage to save the tasks in the local storage. It makes use of the PushNotification library to schedule alarms for the tasks.

### Done.js

This is the done tasks component. It displays a list of tasks that have been marked as done. It allows users to uncheck a task to mark it as not done, and to delete a task.

### ToDo.js

This is the to-do tasks component. It displays a list of tasks that have not been marked as done. It allows users to check a task to mark it as done, and to delete a task.

## Authors

* **Adewale Adenle** - *Initial work* - [Github](https://github.com/Adewale-1)

## License

This project is licensed under the MIT License.
