import React, {ReactElement} from 'react';
import SocketsProvider from './context/socket.context';
import Chat from './components/Chat';
import './global.css';

function App(): ReactElement {
    return (
        <SocketsProvider>
            <Chat/>
        </SocketsProvider>
    );
}

export default App;
