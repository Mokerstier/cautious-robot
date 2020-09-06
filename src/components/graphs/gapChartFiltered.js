import React, { Component } from "react";
import * as d3 from "d3";
import { getClusters, getEntries } from "../../getClusters";

function color(d) {
  const orange = "rgb(239, 166, 70)";
  const red = "rgb(203, 47, 13)";
  const green = "rgb(71, 246, 138)";
  const yellow = "rgb(202, 233, 58)";
  let sum;
  let number = d.value || d[0].value;

  if (number.length > 0) {
    sum = d.value.reduce((previous, current) => (current += previous));
    number = sum / number.length;
  }
  if (number >= 80) return green;
  if (number >= 60) return yellow;
  if (number >= 40) return orange;
  if (number >= 20) return red;
}

function tooltipText(d) {
  const text = d.text;
  const number = d.length ? d.length : "";
  const topic = d.topic;
  return number + "<br/>" + text + "<br/>" + topic;
}

class GapChartFiltered extends Component {
  constructor(props) {
    super(props);
    // this.state.dataset = this.props.data
    this.state = { dataset: this.props.data };
  }
  chart = React.createRef();
  group = React.createRef();
  tooltip = React.createRef();

  componentDidMount() {
    this.renderTooltip()
    this.createBackround();
    this.renderNodes();
  }
  componentDidUpdate() {
    this.renderNodes();
  }
  handleRemove() {
    let dataset = this.state.dataset.slice(1)
    this.setState({
      dataset : dataset
    })
 }
  handleAdd() {
    const dataset = this.state.dataset;
    getClusters(dataset).then((filtered) =>
      this.setState({
        dataset: filtered
      })
    );
  }
  createBackround() {
    const accessToRef = d3.select(this.chart.current);
    //Color of the circle-shape background
    // gradient
    const stopColor1 = "#1f9c7d";
    const stopColor2 = "#91e5b4";
    const stopColor3 = "#91e5b4";
    const stopColor4 = "#f9fde4";
    const stopColor5 = "#0000"; // transparent

    const circleNode = accessToRef
      .append("circle")
      .attr("transform", "translate(200, 200)") // center the circleNode
      .attr("fill", "url(#gradient")
      .attr("r", 50);

    const linearGradient = accessToRef
      .append("radialGradient")
      .attr("id", "gradient")
      .attr("x1", "0")
      .attr("x2", "50%")
      .attr("y1", "70%")
      .attr("y2", "100%");

    const color1 = linearGradient
      .append("stop")
      .attr("stop-color", stopColor1)
      .attr("offset", "0%");

    const color2 = linearGradient
      .append("stop")
      .attr("stop-color", stopColor2)
      .attr("offset", "50%");

    const color3 = linearGradient
      .append("stop")
      .attr("stop-color", stopColor3)
      .attr("offset", "51%");

    const color4 = linearGradient
      .append("stop")
      .attr("stop-color", stopColor4)
      .attr("stop-opacity", 0.6)
      .attr("offset", "40%");

    const color5 = linearGradient
      .append("stop")
      .attr("stop-color", stopColor5)
      .attr("offset", "100%");
  }

  renderTooltip() {
    const { w, h } = this.props;
    const dataset = this.state.dataset;
    
  //   const scale = 1.7;
  //   //   const center = [w / 2, h / 2];

  //   const rescale = isNaN(dataset[0].x);

  //   const nodes = dataset.concat(
  //     d3.range(0).map(function () {
  //       return { value: 400, type: "a" };
  //     }),
  //     d3.range(0).map(function () {
  //       return { value: 400, type: "b" };
  //     })
  //   );

  //   const accessToRef = d3.select(this.chart.current)
  //     // .append("svg")
  //     // .attr("width", w)
  //     // .attr("height", h)
  //     // .style("position", "relative")

  //   console.log(accessToRef)
    const tooltip = d3
      .select(this.tooltip.current)
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .attr("class", "tooltip")
      .text("a simple tooltip");
      
      this.setState(
        {tooltip}
      )
  //   const nodeGroup = accessToRef
  //     .append("g")
  //     .attr("transform", "translate(200, 200)") // center the circle-group
  //     .append("g")
  //     .attr("id", "rotate-circle")
      
  //   const node = nodeGroup
  //     .selectAll("circle") // circles
  //     .data(nodes) // adding data
  //     .enter()
  //     .append("circle")
  //     .attr("r", 4)
  //     .attr("fill", (d) => color(d))
  //     .on("mouseover", function (e, d) {
  //       tooltip.transition().duration(200).style("opacity", 0.9);
  //       tooltip
  //         .html(tooltipText(d))
  //         .style("visibility", "visible")
  //         .style(
  //           "left",
  //           e.clientX - tooltip._groups[0][0].clientWidth / 2 + "px"
  //         )
  //         .style(
  //           "top",
  //           e.clientY +
  //             window.scrollY -
  //             (tooltip._groups[0][0].clientHeight + 10) +
  //             "px"
  //         )
  //         .style("z-index", 10);
  //     })
  //     .on("mouseout", function (d) {
  //       tooltip
  //         .transition()
  //         .duration(500)
  //         .style("opacity", 0)
  //         .style("z-index", -1);
  //     });

  //     node
  //     .exit()
  //     .transition().duration(500)
  //     .attr('r', 0)
  //     .remove();

  //   const simulation = d3
  //     .forceSimulation(nodes)
  //     .force(
  //       "collide",
  //       d3.forceCollide().radius((d) => 1 + d.r)
  //     )
  //     .force(
  //       "r",
  //       d3.forceRadial(function (d) {
  //         return d.type === "a" ? 50 : 60;
  //       })
  //     )
  //     .on("tick", ticked);

  //   setTimeout(() => {
  //     simulation.restart();
  //     node.transition().attr("r", (d) => d.r);
  //   }, 1200);

  //   // show the initial arrangement
  //   if (rescale) {
  //     for (const node of dataset) {
  //       node.x = node.x * scale;
  //       node.y = node.y * scale;
  //     }
  //   }
  //   function ticked() {
  //     node
  //       .attr("cx", function (d) {
  //         return d.x;
  //       })
  //       .attr("cy", function (d) {
  //         return d.y;
  //       });
  //   }

  //   ticked();
  }
  // renderGroup(){

  //   const nodeGroup = d3.select(this.group.current)
  //   .append("g")
  //   .attr("transform", "translate(200, 200)") // center the circle-group
  //   .append("g")
  //   .attr("id", "rotate-circle")
  // }

  renderNodes(){
    const { w, h } = this.props;
    const dataset = this.state.dataset;
    const scale = .5;
    const center = [w / 2, h / 2];
    const tooltip = d3.select(this.tooltip.current)
    const rescale = isNaN(dataset[0].x);
    console.log(dataset)
    const nodes = dataset.concat(
      d3.range(0).map(function () {
        return { value: 400, type: "a" };
      }),
      d3.range(0).map(function () {
        return { value: 400, type: "b" };
      })
    );

    const node = d3.select(this.group.current)
      .selectAll("circle") // circles
      .data(nodes); // adding data
      
      // enter
      node
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d) => color(d))
      .transition().duration(500)
      .attr("r", 25);
      
      node
      .on("mouseover", function (e, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(tooltipText(d))
          .style("visibility", "visible")
          .style(
            "left",
            e.clientX - tooltip._groups[0][0].clientWidth / 2 + "px"
          )
          .style(
            "top",
            e.clientY +
              window.scrollY -
              (tooltip._groups[0][0].clientHeight + 10) +
              "px"
          )
          .style("z-index", 10);
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0)
          .style("z-index", -1);
      })

      // exit
      node
      .exit()
      .transition().duration(500)
      .attr('r', 9)
      .remove();

    const simulation = d3
      .forceSimulation(nodes)
      .on("tick", ticked)
      .force(
        "collide",
        d3.forceCollide().radius((d) => 1 + d.r)
      )
      .force(
        "r",
        d3.forceRadial(function (d) {
          return d.type === "a" ? 200 : 50; // Defines the radius of the circle that the nodes rotate
        })
      )
      // .force("x", d3.forceX(center[0]).strength(0.001))
      // .force("y", d3.forceY(center[1]).strength(0.001))
      .stop();
      

    setTimeout(() => {
      simulation.restart();
      node.transition().attr("r", (d) => d.r);
    }, 1200);

    // show the initial arrangement
    // if (rescale) {
    //   for (const node of dataset) {
    //     node.x = node.x * scale ;
    //     node.y = node.y * scale ;
    //   }
    // }
    function ticked() {
      node
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }

    ticked();
  }
  // console.log( getClusters(dataset) )
  render() {
    return (
      <div>
        <div ref={this.tooltip}></div>
        <svg className="chart" ref={this.chart}>
          
          <g transform="translate(200,200)">
            <g className="nodeGroup" ref={this.group}></g>
          </g>
        </svg>
        <button onClick={(e) => this.handleAdd()}>Add</button>
        <button onClick={(e) => this.handleRemove()}>remove</button>
      </div>
    );
  }
}

export default GapChartFiltered;
