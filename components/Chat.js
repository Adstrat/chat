import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const firebase = require("firebase");
require("firebase/firestore");
import '@firebase/auth';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
        createdAt: ''
      },
      isConnected: false
    };

    // connects to firestore database
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCZdwS2A2d2OlAp9s6bsibC4l-_DOTU5S4",
        authDomain: "chatapp-5784b.firebaseapp.com",
        projectId: "chatapp-5784b",
        storageBucket: "chatapp-5784b.appspot.com",
        messagingSenderId: "241495344759",
        appId: "1:241495344759:web:6b2282f5ff652abbb72872",
        measurementId: "G-EQRRZJNG0W"
      });
    }
  }

  componentDidMount() {
    // imports username from start screen
    let name = this.props.route.params.name;
    // sets title to username
    this.props.navigation.setOptions({ title: name });

    // ** CHECKS IF USER IS ONLINE **
    NetInfo.fetch().then(connection => {
      // ONLINE user gets data from firebase database
      if (connection.isConnected) {
        this.setState({
          isConnected: true
        });
        // reference to messages collection in firebase
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
            return
          }
          //update user state with currently active user data
          this.setState({
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
              createdAt: new Date()
            },
            messages: [],
          });
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
        // OFFLINE user gets data from local storage
      } else {
        this.setState({
          isConnected: false
        });
        // gets messages from local storage
        this.getMessages();
      }
    });
  }

  // gets messages from local storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentWillUnmount() {
    // stops listening for authentication
    this.unsubscribe();
    // stops listening for changes
    this.authUnsubscribe();
  }

  // when something changes in messages collection in firestore, updates messages state
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // goes through each document
    querySnapshot.forEach((doc) => {
      // gets the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
        }
      });
    });
    this.setState({
      messages,
    });
  };


  // adds the new message to the end of previous messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        // adds new messages to database 
        this.addMessages();
        // saves new messages to local storage
        this.saveMessages();
      });
  }

  // adds messages to firestore database (via onSend)
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    })
  }

  // saves new messages to local storage (via onSend)
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // used to delete messages (just for test purposes)
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // styling for text bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d5e6f6",
          },
          right: {
            backgroundColor: "#445511",
          }
        }}
      />
    )
  }

  // disables input bar when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  render() {
    //imports color from start screen
    let color = this.props.route.params.color;

    return (
      <View
        style={[styles.container,
        { backgroundColor: color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        {/* prevents keyboard from hiding message on some android devices */}
        { Platform.OS === "android" ?
          <KeyboardAvoidingView behavior="height" /> :
          null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})