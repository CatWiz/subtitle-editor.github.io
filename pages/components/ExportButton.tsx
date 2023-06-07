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
          <button className={styles['select-format']} onClick={handleExport}>.vtt</button>
          <button className={styles['select-format']} onClick={handleExport}>.sub</button>
          <button className={styles['select-format']} onClick={handleExport}>.srt</button>
        </div>
      </>
        // <button className={styles['export-button']} onClick={handleExport}>Export</button>
    )
}