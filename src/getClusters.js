// create a cluster class to store multiple
class ClusterBig {
  constructor(name) {
    this.cluster = true;
    this.topic = name;
    this.value = []
    this.r = 20;
    this.children = [];
  }
}

let clusters = []; // store clusters
let singlets = []; // store singlets

function checkClusters(item) {
  console.log(item);
  if (clusters.length) {
    console.log("i have clusters");
    clusters.forEach((cluster) => {
      console.log(clusters)
      if (cluster.topic === item.topic) {
        console.log("clustermatch: " + cluster.topic);
        cluster.children.push(item);
        cluster.value.push(item.value);
        cluster.length = cluster.children.length;
      } 
    });
  }
}

export async function getClusters(data) {
  // get all topics ✔
  console.log(data);
  const topicOcc = data.reduce(
    (acc, o) => ((acc[o.topic] = (acc[o.topic] || 0) + 1), acc),{}
  );
  // filter data on multiple occurences and create a big node
  // stores topics that occure more then 5 times
  const clusterTopics = [];
  for (const [key, value] of Object.entries(topicOcc)) {
    if (value >= 5) clusterTopics.push(key);
  }
  console.log(clusterTopics);

  clusterTopics.forEach(topic =>{
    let cluster = new ClusterBig(topic, null, null)
    clusters.push(cluster)
  })

  // check if data.topic and topicOcc.includes(data.topic)
  // if(!true) return singlet
  // if(true) check clusters ->
  // -> Find cluster and add item

  try {
    data.forEach((item) => {
      if (!clusterTopics.includes(item.topic)) {
        singlets.push(item);
        console.log("added a singlet");
      } else {
        console.log("will check clusters now");
        checkClusters(item);
      }

    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(singlets);
    console.log(clusters);
    const filteredData = singlets.concat(clusters);
    console.log(filteredData);
    return filteredData;
  }
  
}
