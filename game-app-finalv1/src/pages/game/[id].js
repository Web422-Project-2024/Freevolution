import Image from 'next/image';
import styles from "@/styles/GameDetails.module.css";
import { addFavorite } from '@/lib/userData';
import { useState } from 'react';
import { favoriteGamesAtom, userIdAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from 'next/router';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
  }
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    if (!res.ok) {
      throw new Error(`Failed to fetch game data. Status: ${res.status}`);
    }
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) {
      return {notFound: true};
    }
    return {
      props: { game: data }
    }
  } catch(error) {
    console.error('Error fetching game data:', error);
    return {notFound: true};
  }
}

export default function GameDetails({ game }) { 
  const [currentUserId, setCurrentUserId] = useAtom(userIdAtom);
  const [favoriteGames, setFavoriteGames] = useAtom(favoriteGamesAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  function gameAlreadyExists() {
    if (favoriteGames.find(favorite => game.id === favorite.id)) {
      return true;
    } else {
      return false;
    }
  }

  const renderPlatformSVG = (platform) => {
    if (game.platform === "PC (Windows)" ? "Windows" : game.platform) {
      return <Image src="/windows.svg" alt="Windows" width={20} height={20}  />; 
    } else if (platform === "Web Browser") {
      return <Image src="/webBrowser.png" alt="Web Browser" width={20} height={20} />;
    } else {
      return platform;
    }
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  async function handleSubmit(gameId, e) {
    e.preventDefault();
    if (isAuthenticated()) {
      await addFavorite(gameId, currentUserId);
      setFavoriteGames([...favoriteGames, game]);
      router.push('/favorites');
    } else {
      router.push('/login');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={game.thumbnail}
          alt={game.title}
          width={216}
          height={216}
          className={styles.thumbnail}
        />
        <div className={styles.textColumn}>
          <div className={styles.headlineRow}>
            <h1 className={styles.headline}>{game.title}</h1>
            <div className={styles.filterChips}>
              <div>
                <span className={styles.genreChip}>{game.genre}</span>
              </div>
              <div>
                <span>{renderPlatformSVG(game.platform)}</span>
              </div>
            </div>
          </div>

          <div className={styles.statusInfo}>
            <span className={styles.status}>Status: Live</span>
            <span className={styles.publishedDate}>Release date: {game.release_date}</span>
          </div>
          <div className={styles.textColumn}>
            <p className={styles.supportingText}>
              {isExpanded ? game.description : game.description.substring(0, 750) + '... '}
              <button className={styles.toggleButton} onClick={toggleDescription}>
              {isExpanded ? 'Read less' : 'Read more'}
              </button>
            </p>
          </div>

          { isAuthenticated() && gameAlreadyExists() ? 
            (<button className={styles.button}>Already in Favorites</button>) : 
            (<button className={styles.button} onClick={(e) => handleSubmit(game.id, e)}>Add to Favorites</button>)
          }
        </div>
      </div>

      <div className={styles.screenshots}>
        {game.screenshots && game.screenshots.slice(0, 3).map((screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.image}
            alt={`${game.title} screenshot ${screenshot.id}`}
            width={248}
            height={120}
            className={styles.screenshotImage}
          />
        ))}
      </div>
      <div className={styles.systemRequirements}>
        {game.platform !== "Web Browser" && game.minimum_system_requirements && (
          <div className={styles.requirementsColumn}>
            <h2 className={styles.requirementsTitle}>Minimum System Requirements:</h2>
            <p>Operating System: {game.minimum_system_requirements.os}</p>
            <p>Processor: {game.minimum_system_requirements.processor}</p>
            <p>Memory: {game.minimum_system_requirements.memory}</p>
            <p>Graphics: {game.minimum_system_requirements.graphics}</p>
            <p>Storage: {game.minimum_system_requirements.storage}</p>
          </div>
        )}
        <div className={styles.additionalInfo}>
          <h2 className={styles.additionalInfoTitle}>Additional Information</h2>
          <p>Developer: {game.developer}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Platform: {game.platform}</p>
          <p>Game: <a href={game.game_url} target="_blank" rel="noopener noreferrer">Official Website</a></p>
        </div>
      </div>
    </div>
  )
}