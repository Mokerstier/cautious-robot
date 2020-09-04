import React, { Component } from "react";
import * as d3 from "d3";


// import commentsJSON from "./data.json";

function color(d) {
  const orange = "rgb(239, 206, 45)";
  const red = "rgb(203, 47, 13)";
  const green = "rgb(71, 246, 138)";
  const yellow = "rgb(202, 233, 58)";
  let sum;
  let number = d.value

  if (number.length > 0){
    sum = d.value.reduce((previous, current) => current += previous);
    number = sum / number.length
  }
  if (number >= 80) return green;
  if (number >= 60) return yellow;
  if (number >= 40) return orange;
  if (number >= 20) return red;
}

class RayChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
  componentDidMount() {
    const { data, w, h } = this.props;
    const scale = 1.7;
    const center = [w / 2, h / 2];
    const rescale = isNaN(data[0].x);
    
    const accessToRef = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "darkblue");


    const node = accessToRef
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 2)
      .attr("fill", (d) => color(d));

    const simulation = d3
      .forceSimulation(data)
      
      .on("tick", tick)
      .force(
        "collide",
        d3.forceCollide().radius((d) => 1 + d.r)
      )
      .force("x", d3.forceX(center[0]).strength(0.01))
      .force("y", d3.forceY(center[1]).strength(0.01))
      .stop();

    // differ application of the forces
    setTimeout(() => {
      simulation.restart();
      node.transition().attr("r", (d) => d.r);
    }, 1200);

    // once the arrangement is initialized, scale and translate it
    if (rescale) {
      for (const node of data) {
        node.x = node.x * scale + center[0];
        node.y = node.y * scale + center[1];
      }
    }

    function tick() {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    // show the initial arrangement
    tick();
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default RayChart;
