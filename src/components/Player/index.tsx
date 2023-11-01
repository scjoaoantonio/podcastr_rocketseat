import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContexts';
import styles from './styles.module.scss'
import Image from 'next/image';

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null)

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        setPlayingState
    } = useContext(PlayerContext)

    useEffect( () => {
        if(!audioRef.current){
            return
        }
        else{
            audioRef.current.pause
        }
        if(isPlaying){
            audioRef.current.play
        }
    }, [ isPlaying])

    const episode = episodeList[currentEpisodeIndex]

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            { episode ?  (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail}
                        alt='thumb'
                        layout='responsive'
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            ) }

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>

                    {episode ? (
                        <Slider
                            trackStyle={{backgroundColor: '#84d361'}}
                            railStyle={{backgroundColor: '#9f75ff'}}
                            handleStyle={{borderColor: '#84d361', borderWidth: 4}}

                            
                        />
                    ) : (
                        <div className={styles.emptySlider}/>
                    )}
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio 
                        src={episode.url} 
                        ref={audioRef}
                        onPlay={()=>setPlayingState(true)}
                        onPause={()=>setPlayingState(false)}
                        autoPlay
                    > 
                    </audio>
                ) }
                
                <div className={styles.buttons}>
                    <button type='button' disabled={!episode}>
                        <img src="/shuffle.svg" alt="Aleatório" />
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button 
                        type='button' 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}                    
                    >
                        
                        { isPlaying 
                            ? <img src="/pause.svg" alt="Tocar" />
                            : <img src="/play.svg" alt="Tocar" />
                        }
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próximo" />
                    </button>
                    <button type='button' disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}