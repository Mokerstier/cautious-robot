import React from 'react';
import $ from './styles.module.scss';
import { Switch, Route } from 'react-router-dom';
import { routes } from 'src/routes';
// import { filterData } from "./controllers/dataFilter"
// import { get_sentiment } from './controllers/getter/get-analysed-data'
// import Topic from 'src/ui/components/organisms/topic';
// import RAWJSON from 'src/data/yelp_test_set_small.json';
// import LARGEJSON from 'src/data/yelp_test_set_review.json';

// const documents = RAWJSON.data.map((node, i) => ({
//   id: node.review_id,
//   language: 'eng',
//   text: node.text,
// }))
//     // {
//     //     'documents': [
//     //         { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
//     //         { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
//     //     ]
//     // };
// const data = {
//   documents
// }
// const largeData = LARGEJSON.data.map((node, i) => {
//   if (i > 100) return;
//   return ({
//   id: node.review_id,
//   language: 'eng',
//   text: node.text,
// })});

// const smallerData = largeData.slice(0, 200)

// console.log(smallerData.length)
// const sentimentAnalyse = get_sentiment(data, 'polarity');

// const keyPhraseAnalyse = get_sentiment(data, 'keyPhrase');

const App = () => {
  // const [dataState, setDataState] = React.useState(data);

  // React.useEffect(() => {
  //     setDataState((a) =>({
  //       ...a,
  //       ...data
  //     }))
  // }, [data])
  return (
    <div className={$.app}>
      <header>
        <h1>Data Driven World</h1>
        
      </header>
      <main>
          <Switch>
              {routes.map(({ path, component: C }) => (
                  <Route
                      key={path}
                      exact
                      path={path}
                      component={C}
                  />
              ))}
          </Switch>
      </main>
    </div>
  );
}

export default App
