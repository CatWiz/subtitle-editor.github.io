import SubtitleEntry from '../Classes/SubtitleEntry'
import styles from '../index_styles.module.css'

export default function VideoPlayer(
    {id, subtitles}: {
        id: string,
        subtitles: SubtitleEntry[],
    },

) {
    const subVTT = 'WEBVTT\n\n' + subtitles.map(sub => sub.ToVTT()).join('\n\n')
    const VTTFile = new Blob([subVTT], {type: 'text/plain'})
    const url = URL.createObjectURL(VTTFile)

    console.log(VTTFile.text())

    return (
        <video id={id} controls className={styles['video']}>
            <track kind="captions" srcLang="en" label="English" src={url} default/>

        </video>
    )
}