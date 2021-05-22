import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Button, ScrollView, Alert, Platform, TouchableOpacityComponent } from "react-native";
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { getRoom } from '../../actions/chat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import _ from 'lodash';

const Chat = ({route}: any)=> {
    const usePrevious = (value: any) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }
    const pharmacyId =  route.params.pharmacyId;
    const [user, setUser]=useState<any>("");
    const socket = useRef<any>();
    const dispatch = useDispatch();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availableChat:any = useSelector<RootState>(state=>state.Chat.Chat);
    const [messages, setMessages]=useState([]);
    const prevChat = usePrevious(availableChat);

    useEffect(() => {
        const createUser = {"_id": "customer" + availableLoginUser.CustomerUser.customer_user_id};
        setUser(createUser)
        init();
         {/*// @ts-ignore */}
        socket.current = new SocketIOClient('http://192.168.8.11:3000');
        socket.current.on('connect', () => {
            socket.current.emit('userJoined', {"message": "", "customerUserId": availableLoginUser.CustomerUser.customer_user_id, "pharmacyId": pharmacyId, "roomId": availableChat.room_id, "userType": "customer"});
            socket.current.on('userJoined', () => {
              
            });
            socket.current.on('message', (messages:any)=>{onReceivedMessage(messages)});
          })
    }, []);

    useEffect(() => {
      if(!_.isEqual(prevChat, availableChat)){
          init();
      }
  }, [availableChat]);

    const init = async () => {
      dispatch(getRoom(availableLoginUser.CustomerUser.customer_user_id, pharmacyId, availableLoginUser.Token)).then(()=>{
          const reverseConversation:any = reverseConversationBody(availableChat.content.content);
          if(availableChat.content.content.length){
              setMessages(reverseConversation)
          }
      });
    };
    
    // Helper functions
    const storeMessages = (messagesStore:any) => {
        setMessages(  previousMessages => 
          GiftedChat.append(previousMessages, messagesStore));
    }

     const onReceivedMessage =(messagesReceived:any) => {

        if(messagesReceived.from === "doctor")
        {
            storeMessages(messagesReceived.message);
        }

      }
    

    const onSend = useCallback((messages = [], roomSendId) => {
        // messages._id = uuidv4();
        socket.current.emit('message',  {"message": messages[0], "customerUserId": availableLoginUser.CustomerUser.customer_user_id, "pharmacyId": pharmacyId, "roomId": availableChat.room_id, "userType": "customer"});
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const reverseConversationBody = (messageObject:any)=> {
      let temp = [];
      for(let i=messageObject.length - 1; i>=0; i--)
      {
        temp.push(messageObject[i]);
      }
      return temp;
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages, availableChat.room_id)}
            user={user}
        />
    )
};

export default Chat;