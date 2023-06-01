import styles from '../index_styles.module.css'

export default function SubtitleInput({startTime, endTime, text}: {startTime: number, endTime: number, text: string}) {

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        startTime = Number(event.target.value);
    }

    return (
        <div className={styles["subtitles-block-wrapper"]}>
            <div className={styles["timecodes"]}>
                <input type={'text'} onChange={onChange} className={styles["time-selector"]} defaultValue={startTime}></input>
                <input type={'text'} onChange={onChange} className={styles["time-selector"]} defaultValue={endTime}></input>
            </div>
            <textarea className={styles["subtitle-text-field"]} placeholder={'Enter your subtitle here'} defaultValue={text}></textarea>
        </div>
    )
}