/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {ReactElement, useEffect, useState} from 'react';
import {useSockets} from '../context/socket.context';
import MessagesContainer from './Messages/Messages';
import styles from './Chat.module.css';
import RoomsContainer from './Rooms/Rooms';

const Chat = (): ReactElement => {
    const {username, setUsername} = useSockets();
    const [tempUsername, setTempUsername] = useState('');

    const handleSetUsername = () => {
        if (!tempUsername) return;
        setUsername(tempUsername);
        localStorage.setItem('username', tempUsername);
        setTempUsername('');
    };

    useEffect(() => {
        setTempUsername(localStorage.getItem('username') || '');
    }, []);

    return (
        <div>
            {!username &&
            <div className={styles.nameInputWrapper}>
                <div className={styles.nameInputInner}>
                    <input className='inp' placeholder='Username' value={tempUsername} onChange={(e) => {
                        setTempUsername(e.currentTarget.value);
                    }}/>
                    <button className='btn' onClick={handleSetUsername}>start</button>
                </div>
            </div>
            }

            {username &&
            <div className={styles.container}>
                <RoomsContainer username={username}/>
                <MessagesContainer/>
            </div>
            }
        </div>
    );
};

export default Chat;