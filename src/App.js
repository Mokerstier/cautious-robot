import React from 'react'
import './App.css'
import RayChart from './eRayChart'
import GapChart from './gapChart'
import TestChart from './testChart'
import erayJSON from './data/eray-test.json'
import fakeJSON from './data/data.json'
import { getClusters, getEntries } from "./filterData"

const fakeData = fakeJSON.data;
const erayData = erayJSON.data;

const App = () =>{
  return (
    <div className="App">
      <header className="App-header">
        {/* <div><RayChart data={rawData} w={400} h={400}/></div>  */}
        <div><GapChart data={fakeData} w={400} h={400}/></div>
       
       <div><TestChart data ={erayData}w={400} h={400}/></div>
      </header>
    </div>
  );
}

export default App
