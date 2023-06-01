import styles from '../index_styles.module.css'

export default function VideoPlayer({id}: {id: string}) {
    return (
        <video id={id} controls className={styles['video']}></video>
    )
}