import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {

  render() {
    //imports username from start screen
    let name = this.props.route.params.name;
    //sets title to username
    this.props.navigation.setOptions({ title: name });
    //imports color from start screen
    let color = this.props.route.params.color;

    return (
      <View
        style={[styles.container,
        { backgroundColor: color }]}>
        <Text>Welcome to Chat!</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})