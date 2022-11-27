import { useEffect, useState, useRef } from "react";

import Conversations from "../conversations/conversations";
import UserNavbar from "../UserNavbar/UserNavbar";
import Message from "./message/message";
import "./messenger.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";


const ENDPOINT = "http://localhost:3001";
// const socket = io.connect(ENDPOINT);

export default function Messenger() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(io(ENDPOINT, { autoConnect: false }));
  const scrollRef = useRef();
  const [response1, setResponse1] = useState([]);


  const [empty, setEmpty] = useState(false);

  const { userName, room,  socketId ,userId,companyIdUserApp,userCoId ,companyId,image } = useSelector((state) => {
    return {
      userName: state.messenger.userName,
      room: state.messenger.room,
      image: state.messenger.image,
      socketId: state.messenger.socketId,
      companyIdUserApp: state.users.companyIdUserApp,
      userId: state.usersAuth.userId,
      userCoId: state.companies.userCoId,
      companyId: state.CompaniesAuth.companyId 
    };
  });



console.log(image)
  //   axios
  //     .post(`https://hire-me-kfab.onrender.com/messenger/newconversation/${companyId}/${userId}`)
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data.result)
 
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  


  //const [own, setOwn] = useState(false)



  const send= (message,sender)=>{
    axios
    .post(`https://hire-me-kfab.onrender.com/messenger/newconversation/${companyId||companyIdUserApp}/${userId||userCoId}` ,{message,sender,image})
    .then((response) => {
      console.log(response);
      console.log(response.data.result)

    })
    .catch((err) => {
      console.log(err);
    });
  }


 useEffect(() => {
  
  axios
  .get(`https://hire-me-kfab.onrender.com/messenger/${userId||userCoId}/${companyId||companyIdUserApp}`)
  .then((result) => {
    console.log(result);
    console.log(result.data.result);
    setResponse1(result.data.result)
  })
  .catch((err) => {
    console.log(err);
  });

 

 }, [userId,companyIdUserApp,companyId,userCoId])
   

useEffect(() => {
  socket.connect();
  //-------------------
      socket.emit("JOIN_ROOM", room);
  //-------------------
})



  
  useEffect(() => {



    socket.on("RECEIVE_MESSAGE", (data) => {
      console.log({
        data,
        response1,
        nextresponse1: [...response1, data],
        socketId
      });
      
 
    
   
  
      send(data.message,data.sender,data.picture)


      setResponse1([...response1, data]);
    });
//-------------------

    return () => {
      socket.removeAllListeners();
    };
  });

//-----------------------------------------
  const sendMessage = () => {
    const messageContent = {
      room: room,
      content: {
        sender: userName,
        message: message,
        image:image
      },
    };

    if (message.length === 0) {
      setEmpty(true)
      return
    }

    socket.emit("SEND_MESSAGE", messageContent);

  setMessage("");
    setEmpty(false);
    // if(userDetails == userName){setOwn(true)}
   // setMessageList([...messageList ,messageContent.content])
  };

//-----------------------------------------


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response1]);





  return (
    <>
      {userId?<UserNavbar />: companyId&& <CompaniesNavbar/>}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search" className="chatMenuInput" type="text" />
            <Conversations  />
        
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {response1.map((elem) => (
                <div ref={scrollRef}>
                  {/* {console.log(elem)} */}
                  <Message  message={elem} own={elem.sender===userName} />
                </div>
              ))}
            </div>
            {empty && <p> Write something before Send !</p>}

            <div className="chatBoxBottom">
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="chatMessageInput"
                placeholder="Write Something ..."
              ></textarea>

              <button
                onClick={() => {
                  sendMessage();
                }}
                className="chatSubmitButton"
              >
                {" "}
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            
    
          </div>
        </div>
      </div>
    </>
  );
}
