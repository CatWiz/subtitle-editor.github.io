import { useState } from 'react';
import styles from '../index_styles.module.css';
import SubtitleInput from './SubtitleInput';
import SubtitleEntry from '../Classes/SubtitleEntry';

export default function SubtitlesList(
    {onChange, onRemoveSub: onRemove, subs, onKeyDown}: {
        onChange?: (subs: SubtitleEntry[]) => void,
        onRemoveSub?: (index: number) => void,
        subs?: SubtitleEntry[]
        onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
    }
) {
    return (
        <>
            <div className={styles["subtitles-list-wrapper"]}>
                <ul className={styles['subtitles-list']}>
                    {subs?.map((item, index) => (
                        <li key={item.id}>
                            <SubtitleInput subEntry={item} onKeyDown={onKeyDown}/>
                            <button onClick={() => onRemove(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}