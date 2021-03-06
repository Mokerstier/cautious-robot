import React from 'react'
import Maintopic from 'src/core/models/maintopic';
import renderGraph from 'src/ui/components/graphs/render-graph';
import $ from './topic.module.scss';

interface Props{
    topic: Maintopic,
}

const Topic: React.FunctionComponent<Props> = ({ topic }) => {
    const group = React.useRef() as React.RefObject<SVGGElement>;
    const width = 450;
    const height = 350;
    const translate = `translate(50, ${height / 2})`;

    const npsArray = topic.nps.filter((grade) => (grade !== null)) as number[];
        // criticastersCount are grades between 1 and 7
        const criticastersCount = npsArray.filter((grade) => (grade >= 1 && grade <= 6)).length;
        // promotors are grades of 9 or 10
        const promotorsCount = npsArray.filter((grade) => (grade === 9 || grade === 10)).length;
        const criticastersPerc = (criticastersCount / npsArray.length) * 100;
        const promotorsPerc = (promotorsCount / npsArray.length) * 100;
        const averageNps = Math.round(promotorsPerc - criticastersPerc);

    React.useEffect(() => {
        renderGraph(group, topic.children)
    }, [topic, group]);

    return (
        <div className={$.topic}>
            <header className={$.topicheader}>
                <h2>{topic.id}</h2>
                <div className={$.subheader}>
                    <div className={$.npscontainer}>
                        <span>{topic.children.length}</span>
                        <span>Comments</span>
                    </div>
                    <div className={$.npscontainer}>
                        <span>
                            {averageNps}
                        </span>
                        <span>NPS</span>
                    </div>
                </div>   
            </header>
            <div className={$.body}>
                <svg width={width} height= {height}>
                    <g transform={translate} ref={group}></g>
                </svg>
            </div>
            
        </div>
    );
}

export default Topic;
