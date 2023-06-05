import React from 'react';
import SubtitleEntry from '../Classes/SubtitleEntry'
import styles from '../index_styles.module.css'

export default function VideoPlayer(
    {id, subtitles}: {
        id: string,
        subtitles: SubtitleEntry[]
    }
) {
    const videoRef = React.createRef<HTMLVideoElement>();
    const textRef = React.createRef<HTMLTextAreaElement>();

    function handleTimeUpdate() {
        const video = videoRef.current as HTMLVideoElement;
        const textArea = textRef.current as HTMLTextAreaElement;

        if (video === null || textArea === null) {
            return;
        }

        const currentTime = video.currentTime;
        const currentSubtitle = subtitles.find(
            (item) => currentTime >= item.startTimecode && currentTime <= item.endTimecode
        );

        if (currentSubtitle !== undefined) {
            textArea.value = currentSubtitle.text;
        }
        else {
            textArea.value = '';
        }
    }

    return (
        <>
        <div className={styles['video-wrapper']}>
            <video id={id} ref={videoRef} className={styles['video']} controls onTimeUpdate={handleTimeUpdate}></video>
            <textarea ref={textRef} className={styles['subtitle-textarea']} value={''} readOnly={true}/>
        </div>
        </>
    )
}