import styles from '../index_styles.module.css'

export default function FileUploadButton() {
    function onChange (event: { target: HTMLInputElement; }) {
        console.log(event);
        const file = (event.target as HTMLInputElement).files[0];
        const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;

        const videoURL = URL.createObjectURL(file);
        videoPlayer.src = videoURL;
    }

    return (
        <div className={styles["button-pos"]}>
            <input type={'file'} className={styles.inputfile} id={'videofile'} accept={'video/*'} onChange={onChange}></input>
            <label htmlFor={'videofile'} className={styles['button-text']}>Upload video</label>
        </div>
    )
}