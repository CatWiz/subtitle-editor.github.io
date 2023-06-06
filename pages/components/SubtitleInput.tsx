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

    const [startTime, setStartTime] = useState<string>(String(subEntry.startTimecode));
    const [endTime, setEndTime] = useState<string>(String(subEntry.endTimecode));

    function handleChangeTimecode(event: React.ChangeEvent<HTMLInputElement>) {
        const valueStr = event.target.value;

        if (event.target.dataset.isstartinput === 'true') {
            subEntry.startTimecode = Number(valueStr) ?? Number(valueStr.slice(0,  valueStr.length - 1)) ?? 0;
            subEntry.endTimecode = Math.max(Number(valueStr), subEntry.endTimecode); 
            setStartTime(valueStr);
            setEndTime(subEntry.endTimecode.toString());
        }
        else {
            subEntry.endTimecode = Number(valueStr) ?? Number(valueStr.slice(0,  valueStr.length - 1)) ?? 0;
            subEntry.startTimecode = Math.min(Number(valueStr), subEntry.startTimecode);
            setStartTime(subEntry.startTimecode.toString());
            setEndTime(valueStr);
        }


    }

    function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
        subEntry.text = event.target.value;
    }

    function handleFocus() {
        if (onFocus !== undefined) {
            onFocus(index);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key !== 'Tab' && event.key !== 'Backspace' && /[^0-9\.]/.test(event.key)){
            event.preventDefault();
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
            <button className={styles['remove-subtitle-button']} onClick={() => onRemove(index)}>
            </button>
            <div className={styles["purple-green"]}>
                <textarea className={styles["subtitle-text-field"]} placeholder={'Enter subtitle text here'} ref={textRef}
                defaultValue={subEntry.text} onChange={handleChangeText} onKeyDown={onKeyDown} onFocus={handleFocus}></textarea>
                <div className={styles["timecodes"]}>
                    <input data-isstartinput={true} type={'text'} inputMode='numeric'
                        onChange={handleChangeTimecode} onKeyDown={handleKeyDown}
                        className={styles["time-selector-start"]} value={startTime}></input>
                    <input data-isstartinput={false} type={'text'} inputMode='numeric'
                        onChange={handleChangeTimecode} onKeyDown={handleKeyDown}
                        className={styles["time-selector-end"]} value={endTime}></input>
                </div>
            </div>
        </div>
    )
}