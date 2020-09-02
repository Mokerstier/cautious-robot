// import commentsJSON from "./data.json";

// const data = commentsJSON.data;

class Cluster {
  constructor(name, number, child) {
    this.cluster = true;
    this.topic = name;
    this.avarage = [number];
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

  try {
    data.map((data) => {
      console.log(clusters);
      let cluster;
      if (clusterTopics.includes(data.topic) && clusters.length === 0) {

        cluster = new Cluster(data.topic, data.value, data);
        clusters.push(cluster);

      } else if (clusters.length > 0) {
        clusters.forEach((cluster) => {
          if (Object.values(cluster).includes(data.topic)) {
            
            cluster.children.push(data);
            cluster.avarage.push(data.value);
            console.log("pushed child en value");
            return cluster;
          }
        });
      }
      console.log(clusters);
      return clusters;
    });
  }catch(e){console.log(e)}
  finally{
      console.log("clusters done")
      return
  }
}

export function getEntries(data) {}
