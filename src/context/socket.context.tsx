/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,no-unused-vars,@typescript-eslint/ban-types */
import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {SOCKET_URL} from '../config/default';
import {EVENTS} from '../config/events';

interface Context {
    socket: Socket
    username?: string | null
    setUsername: (name: string) => void
    messages?: Array<{ message: string, time: string, username: string }>
    setMessages: Function
    roomId?: string
    roomsList: Record<string, { name: string }>
}

const socket = io(SOCKET_URL);

const SocketsContext = createContext<Context>(
    {socket, setUsername: () => false, roomsList: {}, messages: [], setMessages: () => false}
);

const SocketsProvider = (props: any) => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [roomsList, setRoomsList] = useState({});
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        window.onfocus = () => {
            document.title = 'Chat API';
        };
    }, []);

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRoomsList(value);
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
        setMessages([]);
    });

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({message, username, time}) => {
        if (!document.hasFocus()) {
            document.title = 'New message...';
        }

        setMessages([
            ...messages, {message, username, time}
        ]);
    });

    return (
        <SocketsContext.Provider value={{socket, username, setUsername, roomId, roomsList, messages, setMessages}}  {...props}/>
    );
};

export const useSockets = (): Context => useContext(SocketsContext);

export default SocketsProvider;
