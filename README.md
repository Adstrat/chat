# Native Mobile Chat App

Chat is a mobile application which provides users with a real-time chat interface and options to share images and maps of their location.

It was developed using [React Native](https://reactnative.dev/) and [Expo](https://expo.io). The App also uses the [Gifted Chat library](https://github.com/FaridSafi/react-native-gifted-chat) to create the chat interface and [Google Firebase](https://firebase.google.com/) to store messages and images. 

# Example Screen Shots

Start Screen             |  Chat Screen
:-------------------------:|:-------------------------:
![](assets/Chat%20Start.png) |![](assets/Chat%20Screen.png)

## Features

* Users are first taken to a login screen where they enter their name and choose a background colour for the Chat screen.
* The chat screen displays their conversation along with an input area.
* Users can send images from their library, take photos and add a map with their location.
* Message history is stored locally for faster load times and offline use.


# Installation

## Expo

* Update to the latest LTS Node version installed using NVM.

* Create an [Expo account](https://expo.io)



* To start Expo, you’ll need to install the Expo Command Line Interface (CLI),
by typing in the following command in your terminal:

```
npm install expo-cli --global
```
* After cloning the repo, install dependencies:

```
npm install
```

* Mac users need to install watchman through homebrew

```
brew install watchman
```

## Firebase

* Set up an account with [Google Firebase](https://firebase.google.com/).  Instructions can be found [here](https://firebase.google.com/docs/web/setup)
* You will need to select `Create Database` and `Start Collection` where you must input "messages" as the Collection ID. 

* You will also need to generate an API Key and replace the credentials in the Chat.js file with your own.

# Run

* Open the Expo Developer Tools on the localhost:

```
npm start
```
* To launch the App on your phone, install the Expo app on your mobile device (available in Google Play Store and Apple Store). Then scan the QR code.

* To launch the App on an Emulator, first set up [Android Studio](https://developer.android.com/studio), 
then press "Run on Android device/emulator" on the Expo screen.
