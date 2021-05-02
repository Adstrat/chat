import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "",
    };
  }

  render() {
    return (
      //Background image - covers screen
      <ImageBackground
        source={require("../assets/background-image.png")}
        style={styles.bgImage}
      >
        {/* Input box where user enters their name */}
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder="Your name"
          />
          {/* Choose background color section */}
          <Text style={styles.chooseColor}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Black background"
              accessibilityHint="Let's you choose a color for the chat background."
              accessibilityRole="button"
              style={[styles.colorCircle, styles.color1]}
              onPress={() => this.setState({ color: "#090C08" })}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Purple background"
              accessibilityHint="Let's you choose a color for the chat background."
              accessibilityRole="button"
              style={[styles.colorCircle, styles.color2]}
              onPress={() => this.setState({ color: "#474056" })}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Blue background"
              accessibilityHint="Let's you choose a color for the chat background."
              accessibilityRole="button"
              style={[styles.colorCircle, styles.color3]}
              onPress={() => this.setState({ color: "#8A95A5" })}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Green background"
              accessibilityHint="Let's you choose a color for the chat background."
              accessibilityRole="button"
              style={[styles.colorCircle, styles.color4]}
              onPress={() => this.setState({ color: "#B9C6AE" })}
            />
          </View>
          {/* Button element to go to chat view */}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start Chatting"
            accessibilityHint="Takes you to the chat page."
            accessibilityRole="button"
            style={styles.buttonContainer}
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                name: this.state.name,
                color: this.state.color
              })
            }
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFF",
    marginTop: 90,
  },
  mainContainer: {
    flexDirection: "column",
    width: "88%",
    height: 265,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    width: "88%",
    marginLeft: "6%",
    paddingLeft: 10,
    borderColor: "#757083",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  chooseColor: {
    fontSize: 17,
    marginLeft: "6%",
  },
  colorContainer: {
    flexDirection: "row",
    width: "88%",
  },
  colorCircle: {
    borderRadius: 25,
    height: 40,
    width: 40,
    marginLeft: "6%",
  },
  color1: {
    backgroundColor: "#090C08",
  },
  color2: {
    backgroundColor: "#474056",
  },
  color3: {
    backgroundColor: "#8A95A5",
  },
  color4: {
    backgroundColor: "#B9C6AE",
  },
  buttonContainer: {
    width: "88%",
    marginLeft: "6%",
  },
  button: {
    backgroundColor: "#757083",
    padding: 15,
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#FFF',
    textAlign: "center",
  }
})