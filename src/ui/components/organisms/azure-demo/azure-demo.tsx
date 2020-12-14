import React from 'react'
import Maintopic from 'src/core/models/maintopic';
import $ from './azure-demo.module.scss';

// interface Props{
    
// }
console.log($.form)
const AzureDemo: React.FC = () => {
    const form = React.useRef<HTMLFormElement>(null);
    return (
        <div>
            <h1>Live Demo</h1>
            <p>Enter a sentence and press submit for a live sentiment analyses.</p>
            <form ref={form} action="">
                <label className={$.form} htmlFor="">
                    Put your text here:
                    <input type="text"/>
                </label>
            </form>
        </div>
    );
}

export default AzureDemo;
