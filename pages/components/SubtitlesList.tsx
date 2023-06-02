import { useEffect, useRef, useState } from 'react';
import styles from '../index_styles.module.css';
import SubtitleInput from './SubtitleInput';
import SubtitleEntry from '../Classes/SubtitleEntry';

export default function SubtitlesList(
    {onChange, onRemoveSub: onRemove, subs, onKeyDown, onFocusInput}: {
        onChange?: (subs: SubtitleEntry[]) => void,
        onRemoveSub?: (index: number) => void,
        subs?: SubtitleEntry[]
        onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
        onFocusInput?: (index: number) => void
    }
) {
    return (
        <>
            <div className={styles["subtitles-list-wrapper"]}>
                <ul className={styles['subtitles-list']}>
                    {subs?.map((item, index) => (
                        <li key={item.id}>
                            <SubtitleInput index={index} subEntry={item}
                                onRemove={onRemove} onKeyDown={onKeyDown} onFocus={onFocusInput}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}