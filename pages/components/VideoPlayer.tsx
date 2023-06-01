import SubtitleEntry from '../Classes/SubtitleEntry'
import styles from '../index_styles.module.css'

export default function VideoPlayer(
    {id, subtitles}: {
        id: string,
        subtitles: SubtitleEntry[]
    }
) {
    return (
        <video id={id} controls className={styles['video']}></video>
    )
}