import styles from '../index_styles.module.css';
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import SubtitleEntry from "../Classes/SubtitleEntry";
import SubtitleInput from "./SubtitleInput";


export default function SubtitleManager() {
    const [subs, setSubs] = useState([new SubtitleEntry(0, 0, 'Hello, world!')]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function AddSubtitle(index?: number) {
        index ??= subs.length;

        const lastTimecode = index > 0 ? subs[index - 1].endTimecode : 0;

        const newSubs = [...subs];
        newSubs.splice(index, 0, new SubtitleEntry(lastTimecode, lastTimecode, ''));

        setSubs(newSubs);
        setCurrentIndex(index);
    }

    function handleAddSubtitle() {
        AddSubtitle()
    }

    function handleRemoveSubtitle(index: number) {
        const newSubs = subs.filter((item, i) => i !== index);
        setSubs(newSubs);

        if (index === currentIndex) {
            setCurrentIndex(index - 1);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                AddSubtitle(currentIndex + 1);
                event.preventDefault();
            }
        }
        else if (event.key === 'Backspace') {
            if (event.currentTarget.value === '' && subs.length > 1) {
                handleRemoveSubtitle(currentIndex);
                event.preventDefault();
            }
        }
    }

    function handleFocusInput(index: number) {
        setCurrentIndex(index);
    }

    return (
        <div className={styles['subtitleEditor']}>
            <div className={styles['subtitles-panel']}>

                <div className={styles["subtitles-list-wrapper"]}>
                    <ul className={styles['subtitles-list']}>
                        {subs?.map((item, index) => (
                            <li key={item.id}>
                                <SubtitleInput index={index} subEntry={item} shouldBeFocused={index === currentIndex}
                                    onRemove={handleRemoveSubtitle} onKeyDown={handleKeyDown} onFocus={handleFocusInput}/>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={handleAddSubtitle} className={styles['add-subtitle-button']}>Add</button>
            </div>
            <div className={styles['PlayerTimeLineDiv']}>
                <VideoPlayer id={'videoPlayer'} subtitles={subs}/>
                <div className={styles['player']}/>
            </div>
        </div>
    )
}