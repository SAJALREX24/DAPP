import React ,{useEffect,useState,useContext} from "react";
//internal
//import { ChatAppContext } from "../Context/ChatAppContext";
import {Filter, Friend} from "../Components/index";


const ChatApp = () => {
 // const {title}= useContext(ChatAppContext);
  return (
    <div>
      <Filter/>
      <Friend/>
    </div>
  )
};

export default ChatApp;
