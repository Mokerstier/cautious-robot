import React, { Component } from "react";
import * as d3 from "d3";

function color(d) {
  const orange = "rgb(239, 166, 70)";
  const red = "rgb(203, 47, 13)";
  const green = "rgb(71, 246, 138)";
  const yellow = "rgb(202, 233, 58)";
  let sum;
  let number = d.value;

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

    const nodes = data.concat(
      d3.range(0).map(function () {
        return { value: 400, type: "a" };
      }),
      d3.range(0).map(function () {
        return { value: 400, type: "b" };
      })
    );

    const accessToRef = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("position", "relative");

    // tooltip
    const tooltip = d3
      .select(this.myRef.current)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .attr("class", "tooltip")
      .text("a simple tooltip");

    //Color of the circle-shape background
    // gradient
    const stopColor1 = "#1f9c7d";
    const stopColor2 = "#91e5b4";
    const stopColor3 = "#91e5b4";
    const stopColor4 = "#f9fde4";
    const stopColor5 = "#0000"; // transparent

    const circleNode = accessToRef;
    circleNode
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

    const color1 = linearGradient;
    color1.append("stop").attr("stop-color", stopColor1).attr("offset", "0%");

    const color2 = linearGradient;
    color2.append("stop").attr("stop-color", stopColor2).attr("offset", "50%");

    const color3 = linearGradient;
    color3.append("stop").attr("stop-color", stopColor3).attr("offset", "51%");

    const color4 = linearGradient;
    color4
      .append("stop")
      .attr("stop-color", stopColor4)
      .attr("stop-opacity", 0.6)
      .attr("offset", "40%");

    const color5 = linearGradient;
    color5.append("stop").attr("stop-color", stopColor5).attr("offset", "100%");

    const node = accessToRef
      .append("g")
      .attr("transform", "translate(200, 200)") // center the circle-group
      .append("g")
      .attr("id", "rotate-circle")
      .selectAll("circle") // circles
      .data(nodes) // adding data
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d) => color(d))
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
      });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "collide",
        d3.forceCollide().radius((d) => 1 + d.r)
      )
      .force(
        "r",
        d3.forceRadial(function (d) {
          return d.type === "a" ? 50 : 60;
        })
      )
      .on("tick", ticked);

    setTimeout(() => {
      simulation.restart();
      node.transition().attr("r", (d) => d.r);
    }, 1200);

    // show the initial arrangement
    if (rescale) {
      for (const node of data) {
        node.x = node.x * scale;
        node.y = node.y * scale;
      }
    }
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

  render() {
    return <div className="chart" ref={this.myRef}></div>;
  }
}

export default GapChart;
