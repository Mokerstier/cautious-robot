// create a cluster class to store multiple
class MainTopic {
  constructor(name) {
    this.cluster = true;
    this.topic = name;
    this.information = [];
    this.relevancy = [];
    this.r = 20;
    this.children = [];
    this.proximity = [];
    this.id = "";
  }
}
let topicClusters = []; // store clusters

export async function filterData(dataJSON) {
  // Get all different main topics
  const topicList = dataJSON.topics.map((topic) => {
    return topic.id;
  });

  topicList.forEach(topic =>{
    let cluster = new MainTopic(topic, null, null)
    topicClusters.push(cluster)
  })
  console.log(topicClusters)

  try {
    dataJSON.data.map((item) => {
        console.log(item)
        addToCluster(item);

    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(topicClusters);
    const filteredData = topicClusters
    console.log(filteredData);
    return filteredData;
  }
}

function addToCluster(item){
    topicClusters.forEach((cluster) => {
    if (cluster.topic === item.topic) {
        console.log("clustermatch: " + cluster.topic);
        cluster.children.push(item);
        cluster.information.push(item.information);
        cluster.relevancy.push(item.relevancy);
        cluster.proximity.push(item.proximity);
        cluster.length = cluster.children.length;
      } 
    })
}