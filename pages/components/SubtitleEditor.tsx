import styles from '../index_styles.module.css';
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import SubtitleEntry from "../Classes/SubtitleEntry";
import SubtitleInput from "./SubtitleInput";
import ExportButton from './ExportButton';


export default function SubtitleEditor() {
    const [subs, setSubs] = useState([new SubtitleEntry(0, 1, 'Hello, world!')]);
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
        if (subs.length === 1) {
            return;
        }
        const newSubs = subs.filter((item, i) => i !== index);
        setSubs(newSubs);

        if (index === currentIndex) {
            setCurrentIndex(index - 1);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const textArea = event.currentTarget as HTMLTextAreaElement;

        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                AddSubtitle(currentIndex + 1);
                event.preventDefault();
            }
        }
        else if (event.key === 'Backspace') {
            if (event.shiftKey || event.currentTarget.value === '' && subs.length > 1) {
                handleRemoveSubtitle(currentIndex);
                event.preventDefault();
            }
        }
        else if (event.key === 'ArrowUp' && currentIndex > 0) {
            if (event.ctrlKey
             || textArea.selectionStart === 0 && textArea.selectionEnd === 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
        else if (event.key === 'ArrowDown' && currentIndex < subs.length - 1) {
            if (event.ctrlKey
             || textArea.selectionStart === textArea.value.length && textArea.selectionEnd === textArea.value.length) {
                setCurrentIndex(currentIndex + 1);
            }
        }
        else if (event.key === ' ') {
            if (event.ctrlKey) {
                const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
                if (videoPlayer.paused) {
                    videoPlayer.play();
                }
                else {
                    videoPlayer.pause();
                }
            }
        }
    }

    function handleFocusInput(index: number) {
        setCurrentIndex(index);
    }

    return (
        <div className={styles['subtitleEditor']}>
            <div className={styles['subtitles-panel']}>
                <ExportButton subs={subs}></ExportButton>
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

                <button onClick={handleAddSubtitle} className={styles['add-subtitle-button']}>Add new subtitle</button>
            </div>
            <VideoPlayer id={'videoPlayer'} subtitles={subs}/>
        </div>
    )
}