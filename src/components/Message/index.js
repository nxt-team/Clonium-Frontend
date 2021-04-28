import React from 'react';
import './Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

    return (
        <>

          <div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${isMine ? 'indent' : ''}`,
            `${endsSequence ? 'end' : ''}`
          ].join(' ')}>


            <div style={!isMine && !startsSequence ? {marginLeft: 26} : {}} className="bubble-container">
                {!isMine && startsSequence &&
                <svg
                    style={{marginRight: 4, marginTop: 2}}
                    width="22"
                    height="22"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="19"
                        cy="19"
                        r="18"
                        fill="#FF79CB"
                        stroke="currentColor"
                        stroke-width="2"
                    />
                    <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
                </svg>
                }
              <div className="bubble" >
                { data.message }
              </div>
            </div>
          </div>
        </>
    );
}