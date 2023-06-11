import { KeyboardEventHandler, useState } from 'react';
import SubtitleEntry from '../Classes/SubtitleEntry';
import styles from '../index_styles.module.css'
import React from 'react';
import { setTimeout } from 'timers/promises';

function setInputFilter(
    textbox: HTMLInputElement,
    inputFilter: (val: string) => boolean,
    errMsg
) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value.
          if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }

          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        }
        else if (this.hasOwnProperty("oldValue")) {
          // Rejected value: restore the previous one.
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          // Rejected value: nothing to restore.
          this.value = "";
        }
      });
    });
}

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

    const [startTime, setStartTime] = useState(subEntry.startTimecode.toString());
    const [endTime, setEndTime] = useState(subEntry.endTimecode.toString());
    const inputStartRef = React.createRef<HTMLInputElement>();
    const inputEndRef = React.createRef<HTMLInputElement>();

    function handleChangeTimecode(event: React.ChangeEvent<HTMLInputElement>) {
        const valueStr = event.target.value;

        if (event.target.dataset.isstartinput === 'true') {
            subEntry.startTimecode = Number(valueStr) ?? Number(valueStr.slice(0,  valueStr.length - 1)) ?? 0;
            subEntry.endTimecode = Math.max(Number(valueStr), subEntry.endTimecode); 
            setStartTime(valueStr);
        }
        else {
            subEntry.endTimecode = Number(valueStr) ?? Number(valueStr.slice(0,  valueStr.length - 1)) ?? 0;
            subEntry.startTimecode = Math.min(Number(valueStr), subEntry.startTimecode);
            setEndTime(valueStr);
        }
    }

    function handleInputUnfocus(event: React.FocusEvent<HTMLInputElement>) {
        if (event.target.dataset.isstartinput === 'true') {
            setEndTime(Math.max(subEntry.startTimecode, subEntry.endTimecode).toString());
        }
        else {
            setStartTime(Math.min(subEntry.startTimecode, subEntry.endTimecode).toString());
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

    const textRef = React.createRef<HTMLTextAreaElement>();

    React.useEffect(() => {
        if (shouldBeFocused) {
            const textArea = textRef.current as HTMLTextAreaElement;
            if (textArea === null){
                return;
            }

            textArea.focus();
            textArea.selectionStart = textArea.value.length;
            textArea.selectionEnd = textArea.value.length;
        }
    }, [shouldBeFocused]);


    React.useEffect(() => {
        const inputStart = inputStartRef.current as HTMLInputElement;
        const inputEnd = inputEndRef.current as HTMLInputElement;

        setInputFilter(inputStart, function(value) {
            return /^\d*\.?\d*$/.test(value);
        }, "Please enter a valid number");

        setInputFilter(inputEnd, function(value) {
            return /^\d*\.?\d*$/.test(value);
        }, "Please enter a valid number");
    })

    return (
        <div className={styles["subtitles-block-wrapper"]}>
            <button className={styles['remove-subtitle-button']} onClick={() => onRemove(index)} tabIndex={-1}/>
            <div className={styles["purple-green"]}>
                <textarea className={styles["subtitle-text-field"]} placeholder={'Enter subtitle text here'} ref={textRef}
                defaultValue={subEntry.text} onChange={handleChangeText} onKeyDown={onKeyDown} onFocus={handleFocus}></textarea>
                <div className={styles["timecodes"]}>
                    <input data-isstartinput={true} type={'text'} inputMode='numeric'
                        onChange={handleChangeTimecode} onBlur={handleInputUnfocus} ref={inputStartRef}
                        className={styles["time-selector-start"]} value={startTime}></input>
                    <input data-isstartinput={false} type={'text'} inputMode='numeric'
                        onChange={handleChangeTimecode} onBlur={handleInputUnfocus} ref={inputEndRef}
                        className={styles["time-selector-end"]} value={endTime}></input>
                </div>
            </div>
        </div>
    )
}