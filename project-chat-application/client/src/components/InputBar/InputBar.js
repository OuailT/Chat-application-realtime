import React from 'react';

import './InputBar.css';


const InputBar = ({setMessage, sendMessage, message}) => {
    return (
        <form className="form">
            <input type="text"
                className="input"
                value={message}
                placeholder="Type a message..."
                onChange={(e)=> setMessage(e.target.value) }
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null } />

            <button className="sendButton" onClick={ e => sendMessage(e)}>Send</button>
        </form>

    )
}

export default InputBar;