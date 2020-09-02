import React from 'react'
import './App.css'
import RayChart from './eRayChart'
import GapChart from './gapChart'
import commentsJSON from './data.json'
import { getClusters, getEntries } from "./filterData"

const rawData = commentsJSON.data;

console.log(rawData)


const App = () =>{
  return (
    <div className="App">
      <header className="App-header">
        {/* <div><RayChart data={rawData} w={400} h={400}/></div>  */}
        <div><GapChart data={rawData} w={400} h={400}/></div>
       
       
      </header>
    </div>
  );
}

export default App
