import React from 'react';
// import { useRouteMatch } from 'react-router-dom';
import Topic from 'src/ui/components/organisms/topic';
import { useMainTopics } from 'src/ui/hooks/use-maintopics';

const TopicView: React.FunctionComponent = () => {
    // const graph = useRouteMatch('/graph');
    const { mainTopics } = useMainTopics();
    const [view, setView] = React.useState(mainTopics);

    React.useEffect(() => {
        setView(mainTopics)
    }, [mainTopics])

    if (!view) return null;
    // if (graph) return (
    //     <GraphChart  />
    // )
    return (
        <>
            {view.map((topic) => (
                <Topic topic={topic}/>
            ))}
        </>
    )
}

export default TopicView;