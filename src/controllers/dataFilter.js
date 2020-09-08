import { cluster } from "d3";

// create a cluster class to store multiple
class MainTopic {
  constructor(name, id, sub) {
    this.cluster = true;
    this.topic = name;
    this.information = [];
    this.relevancy = [];
    this.r = 20;
    this.children = [];
    this.proximity = [];
    this.id = id;
    this.sub_topics = sub;
    this.nps = []
  }
}

class SubTopic {
  constructor(name, id) {
    this.cluster = true;
    this.topic = name;
    this.information = [];
    this.relevancy = [];
    this.children = [];
    this.r = 8 ;
    this.proximity = [];
    this.id = id;
    this.nps = []
  }
}
let topicClusters = []; // store clusters

export async function filterData(dataJSON) {
  // Get all different main topics
  topicClusters = [];
  const topicList = dataJSON.topics.map((topic) => {
    return topic.id;
  }) 
  Array.from(dataJSON.data).forEach(node =>{
    let topicArray = node
    .topic.split("_").filter(function (el){
      return el !== ""
    })
    return node.topic_list = topicArray
  })
  topicList.forEach(item =>{
    console.log(item)
    let cluster = new MainTopic(item, item, item.sub_topics)
    topicClusters.push(cluster)
  })
  // console.log(topicList)
  
  try {
    dataJSON.data.forEach((item) => {
      // console.log(dataset)
      
        addToCluster(item);
        
    });
    
  } catch (e) {
    console.log(e);
  } finally {
    let filteredData = [];
    filteredData = topicClusters
    console.log(topicClusters);
    return filteredData;
  }
}

export async function filterSubData(subtopics, dataset){
  topicClusters = []
  const topicList = subtopics.map((topic) => {
    return topic.id.split("_").filter(function (el){
      return el !== ""
    });
  }) 
  
  subtopics.forEach(item =>{
    
    let cluster = new SubTopic(item.description, item.id )
    topicClusters.push(cluster)
  })
 

  
  try {
    
    
    dataset.forEach( item=>{
      addToCluster(item)
    })
    
  } catch (e) {
    console.log(e);
  } finally {
    let filteredData = [];
    filteredData = topicClusters
    return filteredData;
  }
}
function addToCluster(item){
    
    topicClusters.forEach((cluster) => {
    if (cluster.id === item.topic ) {
        cluster.children.push(item);
        cluster.information.push(item.information);
        cluster.relevancy.push(item.relevancy);
        cluster.proximity.push(item.proximity);
        cluster.nps.push(item.nps)
        
      } 
    
    if(cluster.id === item.subtopic){
      cluster.children.push(item);
        cluster.information.push(item.information);
        cluster.relevancy.push(item.relevancy);
        cluster.proximity.push(item.proximity);
        cluster.nps.push(item.nps)
        cluster.r = cluster.children.length 
    }
  })
}