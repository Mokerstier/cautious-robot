export default class AzureResponse {
    confidenceScores: {
        positive: number,
        neutral: number,
        negative: number
    };
    id: string;
    sentences: {
        confidenceScores: {
            positive: number,
            neutral: number,
            negative: number
        };
    }[];
    sentiment: string;
    warnings: string[];

    constructor(document: any) {
        this.confidenceScores = document.confidenceScores;
        this.id = document.id;
        this.sentences = document.sentences;
        this.sentiment = document.sentiment;
        this.warnings = document.warnings;
    }
}