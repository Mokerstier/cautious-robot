import React, { Component } from "react";

class BackGroundChart extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
      componentDidMount() {
          const accessToRef = this.props
       // Color of the circle-shape background 
        // gradient
        const stopColor1 ="#1f9c7d"
        const stopColor2 ="#91e5b4"
        const stopColor3 ="#91e5b4"
        const stopColor4 ="#f9fde4"
        const stopColor5 ="#0000" // transparent

        const circleNode = accessToRef
        .append("circle")
        .attr("transform", "translate(200, 200)") // center the circleNode
        .attr("fill", "url(#gradient")
        .attr( "r", 50)
        
        const linearGradient = accessToRef
        .append("radialGradient")
        .attr("id", "gradient")
        .attr("x1", "0")
        .attr("x2", "50%")
        .attr("y1", "70%")
        .attr("y2", "100%")

        const color1 = linearGradient
        .append("stop")
        .attr("stop-color", stopColor1)
        .attr("offset", "0%")

        const color2 = linearGradient
        .append("stop")
        .attr("stop-color", stopColor2)
        .attr("offset", "50%")

        const color3 = linearGradient
        .append("stop")
        .attr("stop-color",stopColor3)
        .attr("offset", "51%")

        const color4 = linearGradient
        .append("stop")
        .attr("stop-color", stopColor4)
        .attr("stop-opacity", .6)
        .attr("offset", "40%")

        const color5 = linearGradient
        .append("stop")
        .attr("stop-color", stopColor5)
        .attr("offset", "100%")
      }
      render() {
        return <div ref={this.myRef}></div>;
      }
}

export default BackGroundChart;