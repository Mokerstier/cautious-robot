import React, { Component } from "react";
import * as d3 from "d3";
import { filterData, filterSubData } from "../../controllers/dataFilter";


function color(d) {
  // const orange = "rgb(239, 166, 70)";
  // const red = "rgb(203, 47, 13)";
  // const green = "rgb(71, 246, 138)";
  // const yellow = "rgb(202, 233, 58)";
  let sum;
  let number = d.nps || d[0].nps;
  if (number.length > 0) {
    sum = d.nps.reduce((previous, current) => (current += previous));
    number = sum / number.length;
  }
  if (number >= 8) return "#green-gradient";
  if (number >= 6) return "#yellow-gradient";
  if (number >= 4) return "#orange-gradient";
  if (number >= 1) return "#red-gradient";

  return d.color || "rgb(71, 246, 138)";
}

function tooltipText(d) {
  const text = d.text || d.topic;
  const number = d.children ? d.children.length : d.nps;
  const topic = d.topic_list
    ? d.topic_list[0] + ": " + d.topic_list[1]
    : d.topic;
  return number + "<br/>" + text.slice(0,40).concat("...")+ "<br/>" + topic;
}

class Vodafone extends Component {
  constructor(props) {
    super(props);
    // this.state.dataset = this.props.data
    this.state = {
      dataset: this.props.data.data,
      topics: this.props.data.topics,
      dataCluster: null
    };
  }
  chart = React.createRef();
  background = React.createRef();
  information = React.createRef();
  nodegroup = React.createRef();
  tooltip = React.createRef();
  buttonContainer = React.createRef();

  componentDidMount() {
    // const dataset = this.state.dataset;
    // this.renderInfo()
    this.getTopics();
    this.renderTooltip();
    this.createBackground();
    this.createNodeColor();
    // this.renderNodes();
  }
  componentDidUpdate() {
    this.renderInfo()
    this.renderNodes();
  }
  handleRemove() {
    let dataset = this.state.dataset.slice(1);
    this.setState({
      dataset: dataset,
    });
  }
  handleTopic(index) {
    const dataset = this.props.data;
    console.log(dataset)
    filterData(dataset).then((filtered) => {
     console.log(filtered )
    this.setState({
      dataCluster: filtered[index]
    })
      if(filtered[index].children.length < 100){
        this.setState({
          dataset: filtered[index].children,
          subTopics: dataset.topics[index].sub_topics  
        });
      } else {
        console.log(filtered[index].children)
        filterSubData(dataset.topics[index].sub_topics, filtered[index].children).then(subfilter =>{
          this.setState( { 
            dataset: subfilter,
            subTopics: dataset.topics[index].sub_topics 
          })
          
        })
      }
    });
  }
  handleSubTopic(dataset) {
    filterData(dataset).then((subfilter) => {
      
      console.log(subfilter);
    });
  }
  createBackground() {
    const accessToRef = d3.select(this.background.current);
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
      .attr(
        "transform",
        "translate(" + this.props.w / 2 + "," + this.props.h / 2 + ")"
      ) // center the circleNode
      .attr("fill", "url(#gradient)")
      .attr("opacity", 0.5)
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
  }
  createNodeColor() {
    const accessToRef = d3.select(this.nodegroup.current);

    //highlight 
    // const highlight = accessToRef
    // .append("radialGradient")
    // .attr("id","highlight-gradient")
    // .attr("cx", "0.25")
    // .attr("cy", "0.25")
    // .attr("r", "0.25")

    
    // Green nodes
    const greenGradient = accessToRef
      .append("radialGradient")
      .attr("id", "green-gradient");
    // .attr("x1", "0")
    // .attr("x2", "50%")

    const stopColor1 = greenGradient
      .append("stop")
      .attr("stop-color", "limegreen")
      .attr("offset", "40%");

    const stopColor2 = greenGradient
      .append("stop")
      .attr("stop-color", "black")
      .attr("offset", "99%")
      .attr("stop-opacity", 0.6)

    // Yellow nodes
    const yellowGradient = accessToRef
      .append("radialGradient")
      .attr("id", "yellow-gradient");
    // .attr("x1", "0")
    // .attr("x2", "50%")

    const stopYellow1 = yellowGradient
      .append("stop")
      .attr("stop-color", "yellow")
      .attr("offset", "40%");

    const stopYellow2 = yellowGradient
      .append("stop")
      .attr("stop-color", "black")
      .attr("stop-opacity", 0.6)
      .attr("offset", "99%");

    // Orange nodes
    const orangeGradient = accessToRef
      .append("radialGradient")
      .attr("id", "orange-gradient")
      .attr("cx", "0.25")
      .attr("cy", "0.25")
      .attr("r", "1");


    const stopOrange1 = orangeGradient
      .append("stop")
      .attr("stop-color", "orange")
      .attr("offset", "40%");
      
      const stopOrange3 = orangeGradient
      .append("stop")
      .attr("stop-color", "darkorange")
      .attr("offset", "80%");

    const stopOrange2 = orangeGradient
      .append("stop")
      .attr("stop-color", "black")
      .attr("stop-opacity", 0)
      .attr("offset", "88%");
      const stopOrange4 = orangeGradient
      .append("stop")
      .attr("stop-color", "#000")
      .attr("stop-opacity", 0)
      .attr("offset", "100%");

      // red nodes
    const redGradient = accessToRef
    .append("radialGradient")
    .attr("id", "red-gradient");
  // .attr("x1", "0")
  // .attr("x2", "50%")

  const stopred1 = redGradient
    .append("stop")
    .attr("stop-color", "red")
    .attr("offset", "15%");

  const stopred2 = redGradient
    .append("stop")
    .attr("stop-color", "black")
    .attr("stop-opacity", 0.6)
    .attr("offset", "99%");
    // <linearGradient id="v1"
    //   x1="0" y1="0" x2="1" y2="0">
    //   <stop offset=".2" stop-color="limegreen" />
    //   <stop offset="1" stop-color="black" />
    // </linearGradient>
    //radial-gradient(circle at bottom center, #FFC837 15px, #FF8008);
  }
  renderTooltip() {
    const tooltip = d3
      .select(this.tooltip.current)
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .attr("class", "tooltip")
      .text("a simple tooltip");

    this.setState({ tooltip });
  }
  getTopics() {
    const topics = this.state.topics;
    const topicList = topics.map((topic) => topic);
    console.log(topics)
    this.setState({ subTopics: topics.sub_topics }); // Main topics
    const buttonContainer = d3
      .select(this.buttonContainer.current)
      .selectAll("button")
      .data(topicList)
      .enter()
      .append("button")
      .text((d) => d.description)
      .on("click", (e, d, i) => {
        this.handleTopic(topicList.indexOf(d));
      });
  }
  renderNodes() {
    const { w, h } = this.props;
    const dataset = this.state.dataset;
    const scale = 0.5;
    const center = [w / 2, h / 2];
    const tooltip = d3.select(this.tooltip.current);
    console.log(dataset)
    const rescale = isNaN(dataset[0].x);

    let xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

    const node = d3
      .select(this.nodegroup.current)
      .selectAll("circle") // circles
      .data(dataset) // adding data
      .join("circle") // when updating dataset you need this to bind new data
      .attr("fill", (d) => "url(" + color(d))
      

    // enter
    node
      .enter()
      .append("circle")
      .attr("class", "node_gradient")
  
      
      // .transition()
      // .attr("r", (d) =>  {
      //   console.log(d)
      // });

    node
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("width", xScale.bandwidth());

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
      });

    // exit
    node
      .exit()
      // .transition().duration(500)
      // .attr('r', 0)
      // .attr("cx", 0)
      // .attr("cy", 0)
      .remove();

    // const simulation = d3
    //   .forceSimulation(dataset)
    //   .on("tick", ticked)
    //   .force(
    //     "collide",
    //     d3.forceCollide().radius((d) => 1 + 10)
    //   )
    //   // .force("x", d3.forceX(center[0]).strength(0.001))
    //   // .force("y", d3.forceY(center[1]).strength(0.001))
    //   .force(
    //     "r",
    //     d3.forceRadial((d ) => {
    //       return dataset.length > 200 ? 200 : 80; // Defines the radius of the circle that the nodes rotate
    //     })
    //   )

    const simulation = d3
      .forceSimulation(dataset)
      .velocityDecay(0.6)
      .force("x", d3.forceX(center[0]).strength(0.002))
      .force("y", d3.forceY(center[1]).strength(0.002))
      .force(
        "collide",
        d3.forceCollide().radius((d) => d.r? d.r/5 + 8  : 12 )
      )
      .force(
        "r",
        d3.forceRadial((d) => {
          return dataset.length > 200 ? 200 : 80; // Defines the radius of the circle that the nodes rotate
        })
      )
      .on("tick", ticked)
      .stop();
    // .stop()

    setTimeout(() => {
      simulation.restart();
      node.transition().attr("r", (d) => d.r? d.r*.2 + 8 : 10);
    }, 200);

    // show the initial arrangement
    if (rescale) {
      for (const node of dataset) {
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
  renderInfo(){
    const info = this.state.subTopics ? this.state.subTopics : this.state.topics
    console.log(info)
    const infoList = d3
      .select(this.information.current)
      .selectAll("li")
      .data(info)
      .enter(info? info : this.state.topics)
      .append("li")
      .text(d => d.description? d.description : d.topic)
      
     

    console.log(info)
     
     
    //  .text((d) => d.topic)

  }
  // console.log( getClusters(dataset) )

  render() {
    let translate =
      "translate(" + this.props.w / 2 + "," + this.props.h / 2 + ")";
    return (
      <div>
        <div ref={this.tooltip}></div>
        <div>
          <ul  ref={this.information}></ul>
        </div>
        <svg
          width={this.props.w}
          height={this.props.h}
          className="chart"
          ref={this.chart}
        >
          <g ref={this.background}></g>
          <g transform={translate} >
            <g className="nodeGroup" ref={this.nodegroup}></g>
          </g>
        </svg>
        <div ref={this.buttonContainer}></div>
        <button onClick={(e) => this.handleSubTopic(this.state.dataset)}>Add</button>
        <button onClick={(e) => this.handleRemove()}>remove</button>
      </div>
    );
  }
}

export default Vodafone;
