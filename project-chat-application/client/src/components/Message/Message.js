import React from 'react'


//If is the variable isSentByCurrentUser is true
// we Should return a Message from the right and with blue Color
// We Destructed User, name from message(in the back end)
const Message = ({message : {user, text}, name}) => {
    let isSentByCurrentUser = false;

    const TrimmedName = name.trim().toLowerCase();

    if (user === TrimmedName ) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <div>
            
            </div>
        )
        :

        (
            <div>

            </div>
        )
        
    )
}

export default Message;
