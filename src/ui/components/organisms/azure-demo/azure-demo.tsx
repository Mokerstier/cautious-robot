import React, { FormEvent } from 'react'
import $ from './azure-demo.module.scss';
import _ from 'lodash';
import { useSentiment } from 'src/controllers/getter/get-analysed-data';
import AzureResponse from 'src/core/models/response';

const AzureDemo: React.FC = () => {
    const { response, setDocuments } = useSentiment()
    const form = React.useRef<HTMLFormElement>(null);
    const input = React.useRef<HTMLInputElement>(null);

    const [analysedFeedback, setAnalysedFeedback] = React.useState<AzureResponse[]>([]);
    const [inputValue, setInputValue] = React.useState<string>();
    
    const sendInput = (value: string) => {
        setInputValue(value);
    };
    const delayedInput = React.useCallback(_.debounce((value) => {
        sendInput(value);
    }, 2000), []);
    
    function handleChange() {
        delayedInput(input.current?.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

    }

    React.useEffect(() => {
        if (!inputValue) return;
        const documents = {
            documents: [{
                id: Math.random().toString(),
                language: 'en',
                text: inputValue,
            }]
        }
        setDocuments(documents)

    }, [inputValue])
    
    // React.useEffect(() => {
    //     if (response !== undefined){
    //         console.log(response)
    //         setAnalysedFeedback(response)
    //     }
    // }, [response])

    return (
        <div className={$.demo}>
            <h2>Live Demo</h2>
            <p>Enter a sentence and press submit for a live sentiment analyses.</p>
            <form onSubmit={(e) => handleSubmit(e)} ref={form} action="">
                <div className={$.language}>    
                    <label htmlFor="">
                        <input type="radio" name="" id=""/>
                    </label>
                    <label htmlFor="">
                        <input type="radio" name="" id=""/>
                    
                    </label>
                </div>
                <label className={$.form} htmlFor="">
                    Put your text here:
                    <input
                        onChange={handleChange}
                        ref={input} type="textarea"
                    />
                </label>
            </form>
            {response && response.map((feedback) => (
                <section>
                    <h3>Sentiment analyse</h3>
                    <div className={$.analyse}>
                        <p>Positive {feedback.confidenceScores.positive}</p>
                        <p>Negative {feedback.confidenceScores.negative}</p>
                        <p>Neutral {feedback.confidenceScores.neutral}</p>
                    </div>
                </section>
            ))}
            
        </div>
    );
}

export default AzureDemo;
