import React, {useEffect, useState} from 'react';
import Message from '../Message';
// import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'apple';

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  },[])

  
  const getMessages = () => {
     var tempMessages = [
        {
          id: 1,
          author: 'apple',
          message: "Бей синего",
        },
        {
          id: 2,
          author: 'orange',
          message: 'Себя побей',
        },
        {
          id: 3,
          author: 'orange',
          message: 'F!',
        },
        {
          id: 4,
          author: 'apple',
          message: 'Желтый го тимется',
        },
        {
          id: 5,
          author: 'apple',
          message: 'Ясно понятно',
        },
        {
          id: 6,
          author: 'apple',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        },
        {
          id: 7,
          author: 'orange',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        },
        {
          id: 8,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        },
        {
          id: 9,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 10,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
         {
             id: 11,
             author: 'apple',
             message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
             timestamp: new Date().getTime()
         },
         {
             id: 12,
             author: 'orange',
             message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
             timestamp: new Date().getTime()
         },
         {
             id: 13,
             author: 'orange',
             message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
             timestamp: new Date().getTime()
         },
         {
             id: 14,
             author: 'apple',
             message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
             timestamp: new Date().getTime()
         },
         {
             id: 15,
             author: 'apple',
             message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
             timestamp: new Date().getTime()
         },
         {
             id: 16,
             author: 'apple',
             message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
             timestamp: new Date().getTime()
         },
         {
             id: 17,
             author: 'orange',
             message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
             timestamp: new Date().getTime()
         },
         {
             id: 18,
             author: 'orange',
             message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
             timestamp: new Date().getTime()
         },
         {
             id: 19,
             author: 'apple',
             message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
             timestamp: new Date().getTime()
         },
         {
             id: 20,
             author: 'orange',
             message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
             timestamp: new Date().getTime()
         },
      ]
      setMessages([...messages, ...tempMessages])
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      // let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;


      if (previous) {
          prevBySameAuthor = previous.author === current.author;
        if (prevBySameAuthor) {
          startsSequence = false;
        }
      }
        if (next) {
            nextBySameAuthor = next.author === current.author;
        }
        if (nextBySameAuthor) {
                endsSequence = false;
              }


      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={false}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">

        <div className="message-list-container">{renderMessages()}</div>

      </div>
    );
}