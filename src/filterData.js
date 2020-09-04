// import commentsJSON from "./data.json";

// const data = commentsJSON.data;

class ClusterBig {
  constructor(name, number, child) {
    this.cluster = true;
    this.topic = name;
    this.value = [number];
    this.r = 20;
    this.children = [child];
    
  }
}

export async function getClusters(data) {
  // get all topics ✔

  const topicOcc = data.reduce(
    (acc, o) => ((acc[o.topic] = (acc[o.topic] || 0) + 1), acc),
    {}
  );
  
  // get all  ✔
  // filter data on multiple occurences and create a big node
  
  const clusterTopics = [];
  
  for (const [key, value] of Object.entries(topicOcc)) {
    if (value >= 5) clusterTopics.push(key);
  }
  console.log(clusterTopics);
  let clusters = [];
  let singlets = [];

data.map((item)=>{
    
    if(data.cluster){
      console.log("hello")
      clusters = clusters.map(cluster =>{
        if(cluster.topic === item.topic)  cluster.children.push(data.children)
      }) 
    }
    if (!data.cluster) return 
  })
  
  try {

    data.map((data) => {
      let cluster;
      if(data.cluster){

        clusters.forEach((cluster) => {
          if (Object.values(cluster).includes(data.topic)){
            console.log(cluster)
            cluster.children.concat(data.children)
            return
          }
        })
        return
      }
      
      else if (clusterTopics.includes(data.topic) && clusters.length === 0) {

        cluster = new ClusterBig(data.topic, data.value, data);
        clusters.push(cluster);
        console.log(clusters);

      } else if (clusters.length > 0) {
        clusters.forEach((cluster) => {
          if (Object.values(cluster).includes(data.topic)) {
            console.log(cluster)
            cluster.children.push(data);
            cluster.value.push(data.value);
            cluster.length = cluster.children.length
            console.log("pushed child en value");
          }
        });
      }
      return clusters[0];
    })
  }catch(e){console.log(e)}
  finally{
      console.log(clusters)
      return clusters[0]
  }
}

export function getEntries(data) {}
