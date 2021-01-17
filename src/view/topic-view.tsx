import React from 'react';
import { useHistory } from 'react-router-dom';
import Maintopic from 'src/core/models/maintopic';
import MessageNode from 'src/core/models/messagenode';
import dataJson from 'src/fakeData/dataGenerator.json';
import Topic from 'src/ui/components/organisms/topic';
import { useMainTopics } from 'src/ui/hooks/use-maintopics';


function addToCluster(
    item: MessageNode,
) {
    if (!item) {
        return;
    }
    filteredTopics.forEach((cluster: Maintopic) => {
        if (cluster.id === item.topic) {
            if (!cluster.children.includes(item)) {
                cluster.children.push(item);
                cluster.polarity.push(item.polarity);
                cluster.nps.push(item.nps as number);
            }
        }
    });
}

let filteredTopics: Maintopic[] = [];

const TopicView: React.FunctionComponent = () => {
    const history = useHistory();
    const { mainTopics } = useMainTopics();
    const [view, setView] = React.useState(mainTopics);


    React.useEffect(() => {
        setView(mainTopics)
    }, [mainTopics])

    React.useEffect(() => {
        const { data, topics } = dataJson;
        filteredTopics = [];
        const topicList = topics.map((topic: any) => topic);
        topicList.forEach((item: Maintopic) => {
            const cluster = new Maintopic(item);
            filteredTopics.push(cluster);
        });
        const query = new URLSearchParams(history.location.search);

        const customDaysQuery = query.getAll('day');
        console.log(customDaysQuery[0])
        let customDays: number[] = [];
        if (customDaysQuery.length === 0) {
            return;
        } else customDays = customDaysQuery.map((timestamp) => Number(timestamp));
        function filterDate(node: MessageNode) {
            const filterMaxDate = customDays[customDays.length - 1] / 1000;
            const filterMinDate = customDays[0] / 1000;
            return (Number(node.timestamp) >= filterMinDate && Number(node.timestamp) <= filterMaxDate);
        }
        
        const filtered = data.filter(filterDate);
        filtered.forEach((item: MessageNode) => addToCluster(item));

        setView(filteredTopics)
    }, [history.location]);

    if (!view) return null;
    // if (graph) return (
    //     <GraphChart  />
    // )
    return (
        <>
            {view.map((topic) => (
                <Topic key={topic.description} topic={topic}/>
            ))}
        </>
    )
}

export default TopicView;