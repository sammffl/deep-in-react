import React from 'react';
import ReactDom from 'react-dom';

function Page(){
    const topics = ['React', 'Flux', 'Redux']

    return (
        <div>
            <h1>React book title</h1>
            <ul>
                topics.map((topic) => (<li>{topic}</li>))
            </ul>
        </div>
    );
}

ReactDom.render(<Page />, document.getElementById('app'));
