import React, { FormEvent } from 'react'
import $ from './azure-demo.module.scss';
import _ from 'lodash';
import { useSentiment } from 'src/controllers/getter/get-analysed-data';

const AzureDemo: React.FC = () => {
    const { response, setDocuments } = useSentiment()
    const form = React.useRef<HTMLFormElement>(null);
    const input = React.useRef<HTMLTextAreaElement>(null);

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

    }, [inputValue, setDocuments])
    

    return (
        <main>
            <div className={$.demo}>
                <h2>Live Demo</h2>
                <p>Enter a sentence and press submit for a live sentiment analyses.</p>
                <p>Example positive text: LOVE LOVE LOVE this place for breakfast. They are always busy but I've never had to wait. The selection for breakfast is yummy!  I'd suggest this place to everyone!</p>
                <p>Example negative text: Disgusting sandwich.</p>
                <form onSubmit={(e) => handleSubmit(e)} ref={form} action="">
                    <div className={$.language}>    
                        <label htmlFor="">
                            English
                            <input type="radio" name="lang" id="ENG" value="ENG"/>
                        </label>
                        <label htmlFor="">
                            Dutch
                            <input type="radio" name="lang" id="NL" value="NL"/>
                        
                        </label>
                    </div>
                    <label className={$.form} htmlFor="input">
                        Put your text here:
                        <textarea ref={input} onChange={handleChange} name="" id="input" cols={30} rows={10}></textarea>
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
        </main>
    );
}

export default AzureDemo;
