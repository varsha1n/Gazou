import React from 'react';

function Message(){
    const name='';
    if (name)
        return <p>hi this is {name} first time using react</p> ;
    return <h1>hello world</h1>
}

export default Message; 