import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage != "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), 
            };

            await socket.emit("send_message", messageData);
        }
    }
    
    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data]) // takes the current list of message and appends the new message.
            console.log(data);
    });
  }, [socket]);

    return (
        <div class="chat-window">
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'> </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    placeholder="hey"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>

            </div>

        </div>
    )
}


export default Chat