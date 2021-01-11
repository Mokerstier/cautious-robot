export default class MessageNode {
    nps?: number;
    polarity: number;
    text: string;
    timestamp: string;
    topic: string;

    constructor(data: MessageNode) {
        this.polarity = data.polarity;
        this.timestamp = data.timestamp;
        this.topic = data.topic;
        this.text = data.text;
        this.nps = data.nps;
    }
}
