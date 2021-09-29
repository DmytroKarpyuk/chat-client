import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {useSockets} from '../../context/socket.context';
import {EVENTS} from '../../config/events';
import styles from './Messages.module.css';

const MessagesContainer = (): ReactElement => {

    const {socket, messages, roomId, username, setMessages} = useSockets();
    const [tempMessage, setTempMessage] = useState('');
    const messageEndRef = useRef<null | HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (!String(tempMessage).trim()) return;

        const message = tempMessage;
        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, message, username});

        const date = new Date();

        if (messages) {
            setMessages([
                ...messages,
                {
                    username: 'You',
                    message,
                    time: `${date.getHours()}:${date.getMinutes()}`
                }
            ]);
        }

        setTempMessage('');
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    if (!roomId) return <div/>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.messageList}>
                {
                    messages?.map(({message, username, time}, index) => {
                        return (
                            <div key={index} className={username === 'You' ? styles.ownMessage : styles.message}>
                                <div className={styles.messageInner}>
                                    <span className={styles.messageSender}>{username} - {time}</span>
                                    <span className={styles.messageBody}>{message}</span>
                                </div>
                            </div>
                        );
                    })
                }
                <div ref={messageEndRef}/>
            </div>
            <div className={styles.messageBox}>
                <textarea rows={1} placeholder='Tape your message' value={tempMessage} onChange={(e) => setTempMessage(e.currentTarget.value)}/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessagesContainer;