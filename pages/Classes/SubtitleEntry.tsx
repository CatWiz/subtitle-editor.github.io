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

    static ToTimestamp(timecode: number): string {
        const hours = Math.floor(timecode / 3600);
        const minutes = Math.floor((timecode - hours * 3600) / 60);
        const seconds = Math.floor(timecode - hours * 3600 - minutes * 60);
        const milliseconds = Math.floor((timecode - hours * 3600 - minutes * 60 - seconds) * 1000);

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    public ToVTT(): string {
        return `${SubtitleEntry.ToTimestamp(this.startTimecode)} --> ${SubtitleEntry.ToTimestamp(this.endTimecode)}\n${this.text}\n\n`;
    }
}