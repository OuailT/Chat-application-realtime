import React, {useEffect, useState} from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import InfoBar from '../InfoBar/InfoBar';
import InputBar from '../InputBar/InputBar';
import './Chat.css';


//socket.emit helps to exchange data from both sides 
//QueryString module will help us to get the data from the URL
//We got the location.search from the router in the back-end , we got the data that the user typed
//To connect the client side with the server side we used the socket io with the endpoint.

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const ENDPOINT = 'localhost:5000';
    
    useEffect(()=> {
        // const data = queryString.parse(location.search)
        
        const { name, room } = queryString.parse(location.search);

        console.log(name, room);

        socket = io.connect(ENDPOINT,connectionOptions);
        
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error);
            }

        });

        // return () => {
        // socket.emit('disconnect');
        // socket.off();
        // }

    },[ENDPOINT, location.search]);



    //useEffect Messages handler
    //Adding any messages to my messages array
    //We want to run this function only when Array messages Changes

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message])
        })
        // return () => {
        //   socket.off()
        // }
      }, [messages])


    //Function to send the a message 
    const sendMessage = (e) => {
        e.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, ()=> setMessage(''));
        }
      }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room= {room}/>
                <InputBar message={message} sendMessage={sendMessage} setMessage={setMessage} />

                {/* <input type="text" value={message}
                onChange={(e)=> setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}/> */}

            </div>
        </div>
    )
}

export default Chat
