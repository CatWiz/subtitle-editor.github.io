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
    public id: number = SubtitleEntry._IdCounter++;

    private static _IdCounter: number = 0;

    constructor(startTime: number, endTime: number, text: string) {
        this.startTimecode = startTime;
        this.endTimecode = endTime;
        this.text = text;
    }

    static ToTimestamp(timecode: number): string {
        const formatParams = {
            minimumIntegerDigits: 2,
            useGrouping: false
        };

        const hours = Math.floor(timecode / 3600);
        const minutes = Math.floor((timecode - hours * 3600) / 60);
        const seconds = Math.floor(timecode - hours * 3600 - minutes * 60);
        const milliseconds = Math.floor((timecode - hours * 3600 - minutes * 60 - seconds) * 1000);

        const hoursStr = hours.toLocaleString('en-US', formatParams);
        const minutesStr = minutes.toLocaleString('en-US', formatParams);
        const secondsStr = seconds.toLocaleString('en-US', formatParams);
        const millisecondsStr = milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false});

        return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`;
    }

    public ToVTT(): string {
        return `${SubtitleEntry.ToTimestamp(this.startTimecode)} --> ${SubtitleEntry.ToTimestamp(this.endTimecode)}\n${this.text}`;
    }
}