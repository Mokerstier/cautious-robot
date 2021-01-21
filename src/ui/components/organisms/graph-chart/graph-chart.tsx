import React from 'react'
import Maintopic from 'src/core/models/maintopic';
import renderLine from 'src/ui/components/graphs/render-line';
import $ from './graph-chart.module.scss';

interface Props{
    topic: Maintopic,
}

const GraphChart: React.FunctionComponent<Props> = ({ topic }) => {
    const rootSVG = React.useRef<SVGSVGElement>(null);
    const axisBottom = React.useRef<SVGGElement>(null);
    const npsKPI = React.useRef<SVGLineElement>(null);
    const axisLeft = React.useRef<SVGGElement>(null);
    const nodeGroup = React.useRef<SVGGElement>(null);
    const NPS = React.useRef<SVGPathElement>(null);
    const group = React.useRef() as React.RefObject<SVGGElement>;
    const width = 460;
    const height = 400;
    // const translate = `translate(50, ${height / 2})`;

    const npsArray = topic.nps.filter((grade) => (grade !== null)) as number[];
        // criticastersCount are grades between 1 and 7
        const criticastersCount = npsArray.filter((grade) => (grade >= 1 && grade <= 6)).length;
        // promotors are grades of 9 or 10
        const promotorsCount = npsArray.filter((grade) => (grade === 9 || grade === 10)).length;
        const criticastersPerc = (criticastersCount / npsArray.length) * 100;
        const promotorsPerc = (promotorsCount / npsArray.length) * 100;
        const averageNps = Math.round(promotorsPerc - criticastersPerc);

    React.useEffect(() => {
        const SVGElements = {
            rootSVG: rootSVG.current,
            axisBottom: axisBottom.current,
            axisLeft: axisLeft.current,
            nodeGroup: nodeGroup.current,
            NPS: NPS.current,
            NPSKPI: npsKPI.current,
        };
        renderLine(topic.children, SVGElements, width, height)
    }, [topic.children, group, rootSVG]);
    
    if (!topic.children.length) return null;
    return (
        <div >
            <header >
                <h2>{topic.id}</h2>
                <div >
                    <div >
                        <span>{topic.children.length}</span>
                        <span>Comments</span>
                    </div>
                    <div >
                        <span>
                            {averageNps}
                        </span>
                        <span>NPS</span>
                    </div>
                </div>   
            </header>
            <div >
                <svg className={$.graph} width={width} height={height} ref={rootSVG}>
                    <g ref={axisLeft} />
                    <g ref={axisBottom} />
                    <g ref={nodeGroup} />
                    <line ref={npsKPI} />
                    <path ref={NPS} />
                </svg>
            </div>
            
        </div>
    );
}

export default GraphChart;
