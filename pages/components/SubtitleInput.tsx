import { KeyboardEventHandler } from 'react';
import SubtitleEntry from '../Classes/SubtitleEntry';
import styles from '../index_styles.module.css'

export default function SubtitleInput(
    {
        subEntry,
        onKeyDown,
        onRemove,
        index
    }: {
        subEntry: SubtitleEntry
        onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
        onRemove?: (index: number) => void
        index: number
    }) {

    function handleChangeTimecode(event: React.ChangeEvent<HTMLInputElement>) {
        const text = (event.target.value as string).replace(/[^0-9.]/g, '');

        if (event.target.dataset.isstartinput === 'true') {
            subEntry.startTimecode = Math.min(Number(text), subEntry.endTimecode);
            event.target.value = subEntry.startTimecode.toString();
        }
        else {
            subEntry.endTimecode = Math.max(Number(text), subEntry.startTimecode);
            event.target.value = subEntry.endTimecode.toString();
        }
        // console.log(subEntry);
    }

    function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
        subEntry.text = event.target.value;
        // console.log(subEntry);
    }

    return (
        <div className={styles["subtitles-block-wrapper"]}>
            <div className={styles["timecodes"]}>
                <input data-isstartinput={true} type={'text'} inputMode='numeric'
                    onChange={handleChangeTimecode}
                    className={styles["time-selector"]} defaultValue={subEntry.startTimecode}></input>

                <input data-isstartinput={false} type={'text'} inputMode='numeric'
                    onChange={handleChangeTimecode}
                    className={styles["time-selector"]} defaultValue={subEntry.endTimecode}></input>
            </div>
            <textarea className={styles["subtitle-text-field"]} placeholder={'Enter your subtitle here'}
                defaultValue={subEntry.text} onChange={handleChangeText} onKeyDown={onKeyDown}></textarea>
            <button className={styles['remove-subtitle-button']} onClick={() => onRemove(index)}>Remove</button>
        </div>
    )
}