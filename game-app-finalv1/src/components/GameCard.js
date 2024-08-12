import React from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

const GameCard = ({game}) => {
  const renderPlatformSVG = (platform) => {
    if (platform === "PC (Windows)") {
      return <Image src="windows.svg" alt="Windows" width={20} height={20} className={styles.platformIcon} />;
    } else if (platform === "Web Browser") {
      return <Image src="/webBrowser.png" alt="Web Browser" width={20} height={20} className={styles.platformIcon} />;
    } else {
      return platform;
    }
  };

  return (
    <div className={styles.gameCard}>
      <Link href={`/game/${game.id}`}>
        <Image
          className={styles.gameImage}
          src={game.thumbnail}
          alt={game.title}
          width={134}
          height={120}
        />
        <div className={styles.gameInfo}>
          <h3 className={styles.gameTitle}>{game.title}</h3>
          <p className={styles.gameDescription}>{game.short_description.length > 70 ? game.short_description.substring(0, 70) + '... ' : game.short_description}</p>
          <div className={styles.gameTags}>
            <div className={styles.tag}>
              <span className={styles.tagText}>{game.genre}</span>
            </div>
            <div>
              <span className={styles.platformChip}>{renderPlatformSVG(game.platform)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GameCard
