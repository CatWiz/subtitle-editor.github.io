export default class SubtitleEntry {
    /**
    * In Seconds
    */
    public startTimecode: number;
    /**
    * In Seconds
    */
    public endTimecode: number;
    public text: string;

    constructor(startTime: number, endTime: number, text: string) {
        this.startTimecode = startTime;
        this.endTimecode = endTime;
        this.text = text;
    }
}