import * as d3 from "d3";

function renderLine(data, SVGElements, w, h) {
    const {
        axisBottom, axisLeft, nodeGroup, NPS, NPSKPI,
    } = SVGElements;

    console.log(data)

    // Data we use to fill the GRAPH
    const allData = data;
    // Making sure we present the data in chronological order
    allData.sort((a, b) => (b.timestamp - a.timestamp));

    // Calculate average Polarity over time
    // const averagePOL = (data) => d3.mean(allData
    //     .filter((d) => d.timestamp <= data.timestamp),
    // (d) => d.polarity);

    // SVG GRAPH
    const axisX = d3.select(axisBottom);
    const axisY = d3.select(axisLeft);
    // set up the x and y accordingly to the ranges of the data
    const x = d3.scaleTime()
        .domain(d3.extent(allData, (d) => d.timestamp * 1000))
        .range([0, w]);
    const y = d3.scaleLinear()
        .range([h, 0])
        .domain([-0, 10]);

    // Circles in the GRAPH
    const nodes = d3.select(nodeGroup);
    // GRAPH lines
    const kpi = d3.select(NPSKPI);
    const NPSline = d3.select(NPS);

    kpi
        .attr("y1", y(6.7))
        .attr("y2", y(6.7))
        .attr("x1", w)
        .attr("x2", 0)
        .attr('stroke', 'steelblue')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2);

    axisY
        .attr('transform', 'translate(0, 0)')
        .call(d3.axisLeft(y));
    axisX
        .attr('transform', 'translate(0, 400)')
        .call(d3.axisBottom(x));

    NPSline
        .datum(allData)
        .attr('fill', 'none')
        .attr('stroke', 'currentColor')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2)
        .attr('d', d3.line()
            .curve(d3.curveBasis)
            .x((d) => x(d.timestamp * 1000))
            .y((d) => y(d.nps)));
    // (x - (-1)) * (10 - 0) / (1 - (-1)) + 0
    // formula to change polarity scale from -1:1 to 0:10
    nodes.selectAll('circle')
        .data(allData)
        .join('circle')
        .attr('fill', (d) => d.nps > 6.7 ? 'steelblue' : 'orange')
        .attr('stroke', 'none')
        .attr('cx', (d) => x(d.timestamp * 1000))
        .attr('cy', (d, i) => y(d.nps))
        .attr('r', 3);
}

export default renderLine;