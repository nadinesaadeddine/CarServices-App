import React, { useState, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Send,
} from "react-native-gifted-chat";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Fire from "../services/Fire";
import { ScreenHeader } from "../components/ScreenHeader";
import Images from "../../constants/Images";
import { TouchableOpacity } from "react-native-gesture-handler";

// function ChatScreen({ route, navigation }) {
//   const { user_id } = route.params;
class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: this.props.route.params.user_id, //Fire.uid,
      user_id: this.props.route.params.user_id, //Fire.uid,
      name: "user name",
      avatar: Images.ProfilePicture,
    };
  }

  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }
  UNSAFE_componentWillMount() {
    Fire.off();
  }
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "black",
            fontSize: 14,
          },
          left: {
            color: "black",
            fontSize: 14,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#DCDCDC",
          },
          left: {
            backgroundColor: "#F5F5F5",
          },
        }}
      />
    );
  };

  // showCamera = () => {
  //   console.log("dfdfdf");
  // };

  renderSend(props) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <TouchableOpacity onPress={this.showCamera}>
          <FontAwesome
            name="camera"
            size={18}
            color="grey"
            style={{ paddingRight: 3, paddingTop: 2 }}
          />
        </TouchableOpacity> */}
        <Send {...props}>
          <View style={{ paddingBottom: 10, paddingRight: 10 }}>
            <MaterialIcons name="send" size={20} color="grey" />
          </View>
        </Send>
      </View>
    );
  }
  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        alwaysShowSend={true}
        onSend={Fire.send}
        user={this.user}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        //scrollToBottom
        //infiniteScroll
        //renderInputToolbar={(props) => customtInputToolbar(props)}
      />
    );
    return (
      <>
        <ScreenHeader title="Chat" />
        <KeyboardAvoidingView style={{ flex: 1 }}>{chat}</KeyboardAvoidingView>
      </>
    );
  }
}

export default ChatScreen;
