import React, { useEffect } from 'react';
import io from 'socket.io-client';


export default function SocketComponenet({link}){
  useEffect(() => {
    const socket = io(link);

    socket.emit('client_connection', (data)=>{
        console.log(data)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* {socket.on('system')} */}
    </div>
  );
};
