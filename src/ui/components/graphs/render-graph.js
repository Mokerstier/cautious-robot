import * as d3 from 'd3';

function placePolCluster(number) {
    if (number > 4) return 0;
    if (number < -2) return 1;
    return 2;
}

const nodeColor = ['#29e999', '#e9d629', '#e94629'];
const xCenter = [0, 175, 350];

function renderGraph(group, data) {
    
    if (!data.length) {
        return;
    }

    const root = d3.select(group.current)
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 10)
        .attr('fill', (d) => nodeColor[placePolCluster(d.polarity)]);
        
    function ticked() {
        root.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    }

    const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function(d, i) {
            placePolCluster(d.polarity)
            return xCenter[placePolCluster(d.polarity)];
        }))
        .force('collision', d3.forceCollide().radius(10))
        .on('tick', ticked)
        .stop();

    ticked();
    simulation.restart();
}

export default renderGraph;