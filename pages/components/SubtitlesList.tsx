import { useState } from 'react';
import styles from '../index_styles.module.css';
import SubtitleInput from './SubtitleInput';
import SubtitleEntry from '../Classes/SubtitleEntry';

export default function SubtitlesList(
    {onChange, subs}: {
        onChange?: (subs: SubtitleEntry[]) => void,
        subs?: SubtitleEntry[]
    }
) {
    // const [subs, setSubs] = useState([<SubtitleInput startTime={0} endTime={0} text={'Hello, world!'}/>]);

    // function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    //     const lastTimecode = subs[subs.length - 1].props.endTime;

    //     const newSubs = [...subs, <SubtitleInput startTime={lastTimecode} endTime={lastTimecode} text={'Hello, world!'}/>];

    //     setSubs(newSubs);

    //     console.log(lastTimecode);
    //     console.log(subs)
    // }

    return (
        <>
            <div className={styles["subtitles-list-wrapper"]}>
                <ul className={styles['subtitles-list']}>
                    {subs.map((item, index) => (
                        <li key={index}>
                            <SubtitleInput startTime={item.startTimecode} endTime={item.endTimecode} text={item.text}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}