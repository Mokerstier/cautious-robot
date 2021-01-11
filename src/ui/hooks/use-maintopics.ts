import React from 'react';
import Maintopic from 'src/core/models/maintopic';
import MessageNode from 'src/core/models/messagenode';
import dataJson from 'src/data/dataGenerator.json';

let bundledTopics: Maintopic[] = [];

function addToCluster(
    item: MessageNode,
) {
    bundledTopics.forEach((cluster: Maintopic) => {
        if (cluster.id === item.topic) {
            if (!cluster.children.includes(item)) {
                cluster.children.push(item);
                cluster.polarity.push(item.polarity);
                cluster.nps.push(item.nps as number);
            }
        }
    });
}

export function useMainTopics() {
    const [mainTopics, setMainTopics] = React.useState<Maintopic[]>();
    const { data, topics} = dataJson;

    React.useEffect(() => {
        setMainTopics(bundledTopics);
    }, []);

    bundledTopics = [];
    const topicList = topics.map((topic: any) => topic);

    topicList.forEach((item: Maintopic) => {
        const cluster = new Maintopic(item);
        bundledTopics.push(cluster);
    });

    data.forEach((item: MessageNode) => {
        addToCluster(item);
    });

    return { mainTopics };
}
