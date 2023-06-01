import SubtitlesList from "./SubtitlesList";
import styles from '../index_styles.module.css';
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import SubtitleEntry from "../Classes/SubtitleEntry";

export default function SubtitleManager() {
    const [subs, setSubs] = useState([new SubtitleEntry(0, 0, 'Hello, world!')]);

    function handleAddSubtitle() {
        const lastTimecode = subs.length > 0 ? subs[subs.length - 1].endTimecode : 0;

        const newSubs = [...subs, new SubtitleEntry(lastTimecode, lastTimecode, 'Hello, world!')];

        setSubs(newSubs);

        console.log(lastTimecode);
        console.log(subs)
    }

    function handleRemoveSubtitle(index: number) {
        const newSubs = [...subs];
        const removed = newSubs.splice(index, 1);

        console.log(index, removed)

        setSubs(newSubs);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                handleAddSubtitle();
                event.preventDefault();
            }
        }
        else if (event.key === 'Backspace') {
            if (event.currentTarget.value === '') {
                const index = subs.findIndex((item) => item.text === event.currentTarget.value);

                if (index !== -1) {
                    handleRemoveSubtitle(index);
                }
            }
        }
    }

    return (
        <>
            <div className={styles['subtitles']}>
                <SubtitlesList onRemoveSub={handleRemoveSubtitle} subs={subs} onKeyDown={handleKeyDown}/>
                <button onClick={handleAddSubtitle} className={styles['add-subtitle-button']}>Add</button>
            </div>

            <VideoPlayer id={'videoPlayer'} subtitles={subs}/>
        </>
    )
}