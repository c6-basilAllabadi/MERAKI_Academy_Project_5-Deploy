import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./message.css";
import { useEffect, useState, useRef } from "react";

import {
  setMessageList,
  setMessage,
} from "../../Redux/reducers/Messenger/messenger";

export default function Message({ message ,own }) {



  // const [messageList ,setMessageList] = useState([])

  const dispatch = useDispatch();

  //  const [message ,setMessage] = useState("")
  // const [room ,setRoom] = useState("")
  // const [userName ,setUserName] = useState("")
  // const [messageList ,setMessageList] = useState([])

  return (
    <div className={own ? "message own" : "message"}>
      <div className={own ?"messageTop own":"messageTop"}>
        <img
          className="messageImg"
          src={message.image}
          alt=""
        />
        {/* {console.log(message.image)} */}
        <p className="messageText">
          {" "}
         {message.message}{" "}
        </p>
      </div>

      <div className="messgeBottom"> 1 Hour ago</div>
    </div>
  );
}
