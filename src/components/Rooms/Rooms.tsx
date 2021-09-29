import React, {useState} from 'react';
import {useSockets} from '../../context/socket.context';
import {EVENTS} from '../../config/events';
import styles from './Rooms.module.css';

const RoomsContainer: React.FC<PropsType> = ({username}) => {
    const {socket, roomId, roomsList} = useSockets();
    const [roomName, setRoomName] = useState('');

    const handleCreateRoom = () => {
        if (!String(roomName).trim()) return;
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});
        setRoomName('');
    };

    const handleJoinRoom = (key: string) => {
        if (key === roomId) return;
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    };

    return (
        <nav className={styles.wrapper}>
            <h3 className={styles.username}>{username.toUpperCase()}</h3>
            <div className={styles.createRoomWrapper}>
                <div>
                    <input className='inp' placeholder='Room name' value={roomName} onChange={(e) => {
                        setRoomName(e.currentTarget.value);
                    }}/>
                    <button className='btn' onClick={handleCreateRoom}>create room</button>
                </div>
            </div>
            <ul className={styles.roomList}>
                {
                    Object.keys(roomsList).map((key) => {
                        return (
                            <div key={key}>
                                <button disabled={key === roomId} title={`Join ${roomsList[key].name}`} onClick={() => handleJoinRoom(key)}>
                                    {roomsList[key].name} ➡
                                </button>
                            </div>
                        );
                    })
                }
            </ul>
        </nav>
    );
};

export default RoomsContainer;

type PropsType = {
    username: string
}