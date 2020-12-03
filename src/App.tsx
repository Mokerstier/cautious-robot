import React from 'react'
import './stylesheets/base.css'
import { filterData } from "./controllers/dataFilter"
import { get_sentiment } from './controllers/getter/get-analysed-data'
import Topic from 'src/ui/components/organisms/topic';
import RAWJSON from 'src/data/yelp_test_set_small.json';

const documents = RAWJSON.data.map((node, i) => ({
  id: node.review_id,
  language: 'eng',
  text: node.text,
}))
    // {
    //     'documents': [
    //         { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    //         { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
    //     ]
    // };
const data = {
  documents
}

const sentimentAnalyse = get_sentiment(data, 'polarity');

const keyPhraseAnalyse = get_sentiment(data, 'keyPhrase');

const App = () => {
  const [dataState, setDataState] = React.useState(data);

  React.useEffect(() => {
      setDataState((a) =>({
        ...a,
        ...data
      }))
  }, [data])
  console.log(dataState)
  return (
    <div className="App">
      <header>
        <h1>Data Driven World</h1>
        
      </header>
    </div>
  );
}

export default App
