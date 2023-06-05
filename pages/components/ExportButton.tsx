import SubtitleEntry from "../Classes/SubtitleEntry";
import styles from '../index_styles.module.css'

export default function ExportButton({subs}: {subs: SubtitleEntry[]}) {

    function handleExport(event: React.MouseEvent<HTMLButtonElement>) {
        const VTTString = 'WEBVTT\n\n' + subs.map((item, index) => {
            return item.ToVTT();
        }).join('\n\n');

        const blob = new Blob([VTTString], {type: 'text/vtt'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'subtitles.vtt');
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <button className={styles['export-button']} onClick={handleExport}>Export</button>
    )

}