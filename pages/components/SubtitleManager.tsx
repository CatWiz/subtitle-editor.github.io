import SubtitlesList from "./SubtitlesList";
import styles from '../index_styles.module.css';
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import SubtitleEntry from "../Classes/SubtitleEntry";

export default function SubtitleManager() {
    const [subs, setSubs] = useState([new SubtitleEntry(0, 0, 'Hello, world!')]);

    function handleAddSubtitle() {
        const lastTimecode = subs[subs.length - 1].endTimecode;

        const newSubs = [...subs, new SubtitleEntry(lastTimecode, lastTimecode, 'Hello, world!')];

        setSubs(newSubs);

        console.log(lastTimecode);
        console.log(subs)
    }

    return (
        <>
            <div className={styles['subtitles']}>
                <SubtitlesList/>
                <button onClick={handleAddSubtitle} className={styles['add-subtitle-button']}>Add</button>
            </div>

            <VideoPlayer id={'videoPlayer'}/>
        </>
    )
}