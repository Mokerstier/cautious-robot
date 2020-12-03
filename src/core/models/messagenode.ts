export default class MessageNode {
    color: string;
    nps?: number;
    polarity: number;
    text: string;
    timestamp: number;
    topic: string;

    constructor(data: MessageNode) {
        this.color = data.color;
        this.polarity = data.polarity;
        this.timestamp = data.timestamp;
        this.topic = data.topic;
        this.text = data.text;
        this.nps = data.nps;
    }
}
