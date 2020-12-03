import MessageNode from "src/core/models/messagenode";

export default class Maintopic {
    description: string;
    children: MessageNode[];
    polarity: number[];
    id: string;
    nps: number[];

    constructor(data: Maintopic) {
        this.description = data.description;
        this.id = data.id;
        this.children = [];
        this.nps = [];
        this.polarity = [];
    }
}
