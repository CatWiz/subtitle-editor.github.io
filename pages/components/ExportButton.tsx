import SubtitleEntry from "../Classes/SubtitleEntry";
import styles from '../index_styles.module.css'

export default function ExportButton({subs}: {subs: SubtitleEntry[]}) {

  function triggerDownload(text: string, filename: string) {
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();

    URL.revokeObjectURL(url);
  }

    function handleExportVTT(event: React.MouseEvent<HTMLButtonElement>) {
        const VTTString = 'WEBVTT\n\n' + subs.map((item, index) => {
            return item.ToVTT();
        }).join('\n\n');

        triggerDownload(VTTString, 'subtitles.vtt');
    }

    function handleExportSRT(event: React.MouseEvent<HTMLButtonElement>) {
        const SRTString = subs.map((item, index) => {
            return item.ToSRT(index + 1);
        }).join('\n\n');

      triggerDownload(SRTString, 'subtitles.srt');
  }
  
    function toggleDropdown() {
        var dropdownContent = document.getElementById("myDropdown");
        var buttonIcon = document.querySelector("." + styles['button-icon']);

        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        buttonIcon.classList.toggle(styles['transformed']);
    }

    return (
      <>
        <button className={styles['export-button']} onClick={toggleDropdown}>
        <span className={styles['button-icon']}></span>
          Export as
        </button>
        <div className={styles['dropdown-content']} id="myDropdown" >
          <button className={styles['select-format']} onClick={handleExportVTT}>.vtt</button>
          <button className={styles['select-format']} onClick={handleExportSRT}>.srt</button>
        </div>
      </>
        // <button className={styles['export-button']} onClick={handleExport}>Export</button>
    )
}