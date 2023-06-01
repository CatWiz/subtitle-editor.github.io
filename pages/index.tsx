import styles from './index_styles.module.css';
import Head from 'next/head';
import FileUploadButton from './components/FileUploadButton';
import AppIcon from './icons/play.png';
import SubtitlesList from './components/SubtitlesList';
import VideoPlayer from './components/VideoPlayer';
import SubtitleManager from './components/SubtitleManager';

export default function HomePage() {
  return (
    <>

      <Head>
        <title>Subtitles</title>
      </Head>
      <style jsx global> {`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <div>
        <div className={styles.head}>
          <img src={AppIcon.src} className={styles.ava}></img>
          <a className={styles.header}>Subtitles</a>
          <FileUploadButton/>
        </div>

        {/* <div className={styles['subtitles']}>
          <SubtitlesList/>
        </div>

        <VideoPlayer id={'videoPlayer'}/> */}

        <SubtitleManager/>

        <div className={styles['player']}/>

        <footer className={styles['info']}>
          <div className={styles['info-first']}>
            <span className={styles['description']}>
                Сайт для створення субтитрів для відео – це онлайн-інструмент,
                який забезпечує зручне та ефективне створення субтитрів для відеоматеріалів.
                Він надає користувачам можливість додавати текстові субтитри до відео,
                синхронізувати їх з аудіо та візуальним вмістом, а також редагувати та налаштовувати
                субтитри на свій розсуд.
            </span>
          </div>

          <div className={styles['info-second']}>
            <ul>
              <li className={styles['li']}>
                <span className={styles['gmail']}/>subtitles@gmail.com
              </li>
              <li className={styles['li']}>
                <span className={styles['skype']}/>subtitles.pro
              </li>
              <li className={styles['li']}>
                <span className={styles['discord']}/>subtitles#1824
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
