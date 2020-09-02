import React, { Component } from "react";
import * as d3 from "d3";
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

class GapChart extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    
    componentDidMount() {
      const { data, w, h } = this.props;
      const scale = 1.7;
    //   const center = [w / 2, h / 2];
      const rescale = isNaN(data[0].x);
      console.log(data)
      const nodes = data.concat(
          d3.range(0).map(function() { return {value: 400,type: "a"}; }),
      d3.range(0).map(function() { return {value: 400,type: "b"}; }));
      
      const accessToRef = d3
        .select(this.myRef.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("background-color", "darkblue")
    
      const node = accessToRef
        .append("g")
        .attr("transform", "translate(200, 200)") // center the circle-group
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("fill", (d) => color(d));
        
  
      const simulation = d3.forceSimulation(nodes)
      .force(
        "collide",
        d3.forceCollide().radius((d) => 1 + d.r)
      )
      .force("r", d3.forceRadial(function(d) { return d.type === "a" ? 50 : 60; }))
      .on("tick", ticked);
        
      setTimeout(() => {
        simulation.restart();
        node.transition().attr("r", (d) => d.r);
      }, 1200);

      // show the initial arrangement
      if (rescale) {
        for (const node of data) {
          node.x = node.x * scale ;
          node.y = node.y * scale ;
        }
      }
      function ticked() {
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
      
  
      
      ticked();
    }
  
    render() {
      return <div ref={this.myRef}></div>;
    }
  }
  
  export default GapChart;