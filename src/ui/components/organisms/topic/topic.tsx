import React from 'react'
import Maintopic from 'src/core/models/maintopic';

interface Props{
    topic: Maintopic,
}

const Topic: React.FunctionComponent<Props> = ({ topic }) => {
    return (
        <div>
            <h1>{topic.id}</h1>
        </div>
    );
}

export default Topic;
