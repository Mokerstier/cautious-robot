import React from "react";
import AzureResponse from "src/core/models/response";

const https = require('https');
// const axios = require('axios');
require('dotenv').config();

const subscription_key = process.env.REACT_APP_AZURE_KEY as string;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT as string;

// const paths = {
//     polarity: '/text/analytics/v3.0/sentiment',
//     keyPhrase: '/text/analytics/v3.0/keyPhrases',
// }

export type Documents = { documents: ({ id: string; language: string; text: string | undefined; } | null)[]; };

function useSentiment() {
    const [document, setDocuments] = React.useState<Documents | null>(null);
    const [response, setResponse] = React.useState<AzureResponse[]>();
    const path = '/text/analytics/v3.0/sentiment';
    // if (document === null) return;
    let response_handler = (response: any) => {
        let body = '';
        response.on('data', (d: string) => {
            body += d;
        });
        response.on('end', () => {
            let body_ = JSON.parse(body);
            // let body__ = JSON.stringify(body_, null, '  ');
            // console.log(body_.documents)
            setResponse(body_.documents)
            return body_;

            // axios.post('http://localhost:8080/sentiment', body__,
            //     {headers: {
            //         'Accept': 'application/json, text/plain, */*',
            //         "Content-type": "application/json"
            //     }
            //     }
            // ).then((resp: any) => {
            //     console.log(resp.data);
            //     return resp.data;
            // }).catch((error: Error) => {
            //     console.log(error);
            // });
        });
        response.on('error', (e: { message: string; }) => {
            console.log('Error: ' + e.message);
        });
    };
    
    
    React.useEffect(() => {
        console.log('hello')
        if(document === null) return;
        let get_sentiments = (documents: Documents) => {
            let body = JSON.stringify(documents);
            let request_params = {
                method: 'POST',
                hostname: (new URL(endpoint)).hostname,
                path: path,
                headers: {
                    'Ocp-Apim-Subscription-Key': subscription_key,
                }
            };
        
            let req = https.request(request_params, response_handler);
            req.write(body);
            req.end();
        }
        get_sentiments(document);

    }, [document])
    return { response, setResponse, document, setDocuments };
}
export { useSentiment };