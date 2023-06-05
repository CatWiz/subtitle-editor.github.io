import { KeyboardEventHandler, useState } from 'react';
import SubtitleEntry from '../Classes/SubtitleEntry';
import styles from '../index_styles.module.css'
import React from 'react';

export default function SubtitleInput(
    {
        subEntry,
        onKeyDown,
        onRemove,
        index,
        onFocus,
        shouldBeFocused
    }: {
        subEntry: SubtitleEntry
        onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
        onRemove?: (index: number) => void
        index: number,
        onFocus?: (index: number) => void
        shouldBeFocused?: boolean
    }) {

    const [startTime, setStartTime] = useState(subEntry.startTimecode);
    const [endTime, setEndTime] = useState(subEntry.endTimecode);

    function handleChangeTimecode(event: React.ChangeEvent<HTMLInputElement>) {
        const text = (event.target.value as string).replace(/[^0-9.]/g, '');

        if (event.target.dataset.isstartinput === 'true') {
            if (text !== '') {
                subEntry.startTimecode = Number(text) ?? Number(event.target.value);
            }
            subEntry.endTimecode = Math.max(Number(text), subEntry.endTimecode);
        }
        else {
            if (text !== '') {
                subEntry.endTimecode = Number(text) ?? Number(event.target.value);
            }
            subEntry.startTimecode = Math.min(Number(text), subEntry.startTimecode);
        }

        setStartTime(subEntry.startTimecode);
        setEndTime(subEntry.endTimecode);
        // console.log(subEntry);
    }

    function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
        subEntry.text = event.target.value;
    }

    function handleFocus() {
        if (onFocus !== undefined) {
            onFocus(index);
        }
    }

    const textRef = React.createRef<HTMLTextAreaElement>();

    React.useEffect(() => {
        if (shouldBeFocused) {
            const textArea = textRef.current as HTMLTextAreaElement;
            if (textArea === null){
                return;
            }

            textArea.focus();
            textArea.selectionStart = textArea.value.length;
        }
    }, [shouldBeFocused]);

    return (
        <div className={styles["subtitles-block-wrapper"]}>
            <div className={styles["timecodes"]}>
                <input data-isstartinput={true} type={'text'} inputMode='numeric'
                    onChange={handleChangeTimecode}
                    className={styles["time-selector"]} value={startTime}></input>

                <input data-isstartinput={false} type={'text'} inputMode='numeric'
                    onChange={handleChangeTimecode}
                    className={styles["time-selector"]} value={endTime}></input>
            </div>
            <textarea className={styles["subtitle-text-field"]} placeholder={'Enter your subtitle here'}
                defaultValue={subEntry.text} ref={textRef}
                onChange={handleChangeText} onKeyDown={onKeyDown} onFocus={handleFocus}></textarea>
            <button className={styles['remove-subtitle-button']} onClick={() => onRemove(index)}>Remove</button>
        </div>
    )
}