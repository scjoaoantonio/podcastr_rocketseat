import React from 'react';
import { formatDate } from '../../utils/formatDate';
import styles from './styles.module.scss';

export function Header() {
    const currentDate = formatDate(new Date());

    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Logo Podcastr" />
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}