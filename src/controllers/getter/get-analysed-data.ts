const axios = require('axios');
require('dotenv').config();

const subscription_key = process.env.REACT_APP_AZURE_KEY as string;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT as string;

const paths = {
    polarity: '/text/analytics/v3.0/sentiment',
    keyPhrase: '/text/analytics/v3.0/keyPhrases',
}

type Document = { documents: ({ id: string; language: string; text: string; } | null)[]; };

function get_sentiment(documents: Document, pathKey: string) {
    const path = '/text/analytics/v3.1-preview.1/sentiment';
    console.log(path)
    if (documents === null) return;
    let response_handler = function (response: any) {
        let body = '';
        response.on('data', function (d: string) {
            body += d;
        });
        response.on('end', function () {
            let body_ = JSON.parse(body);
            let body__ = JSON.stringify(body_, null, '  ');
            console.log(body__);
            axios.post('http://localhost:8080/sentiment', body__,
                {headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Content-type": "application/json"
                }
                }
            ).then((resp: any) => {
            console.log(resp.data);
            }).catch((error: Error) => {
            console.log(error);
            });
        });
        response.on('error', function (e: { message: string; }) {
            console.log('Error: ' + e.message);
        });
    };
    
    let get_sentiments = function (documents: Document) {
       
        let body = JSON.stringify(documents);
        console.log(body)
        let request_params = {
            method: 'POST',
            hostname: (new URL(endpoint)).hostname,
            path: path,
            headers: {
                'Ocp-Apim-Subscription-Key': subscription_key,
            }
        };
    
        let req = axios.request(request_params, response_handler);
        req.write(body);
        req.end();
    }
    
    console.log()
    return get_sentiments(documents);
}
export { get_sentiment };