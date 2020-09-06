import React from 'react'
import './stylesheets/base.css'
import ErayChart from './components/graphs/vodafoneChart'
import GapChartFiltered from './components/graphs/gapChartFiltered'
import GapChart from './components/graphs/gapChart'
import TestChart from './components/graphs/testChart'
import erayJSON from './data/eray-test.json'
import fakeJSON from './data/data.json'
import testJSON from './data/test.json'
import { filterData, getEntries } from "././controllers/dataFilter"

const fakeData = fakeJSON.data;
const erayData = erayJSON.data;
const testData = testJSON.data

// filterData(erayJSON)

const App = () =>{
  return (
    <div className="App">
      <header className="App-header">
        {/* <div><RayChart data={erayData} w={400} h={400}/></div>  */}
        <ErayChart data ={erayJSON} />
      </header>
      <main className="graph_container">
        <GapChart data={fakeData} w={400} h={400}/>
        <TestChart data ={erayData}w={400} h={400}/>
        {/* <GapChartFiltered data={testData} w={400} h={400}/> */}
      </main>
    </div>
  );
}

export default App
