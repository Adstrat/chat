import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
const firebase = require("firebase");
require("firebase/firestore");
import '@firebase/auth';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: "",
      uid: 0,
    };

    // connects to fireatore database
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
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // imports username from start screen
    let name = this.props.route.params.name;
    // sets title to username
    this.props.navigation.setOptions({ title: name });
    // reference to messages collection in firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }


  componentWillUnmount() {
    // stops listening for authentication
    this.unsubscribe();
    // stops listening for changes
    this.authUsubscribe();
  }

  // when something changes in messages collection, updates messages state
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
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  // adds messages to database
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    })
  }

  // adds the new message to the end of previous messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessages();
      });
  }

  // styling for text bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          }
        }}
      />
    )
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
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: 'https://placeimg.com/140/140/any',
          }}
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