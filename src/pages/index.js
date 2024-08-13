import { useState } from "react";
import GameCard from "@/components/GameCard";
import styles from "@/styles/Home.module.css";
import CategoryButton from "@/components/CategoryButton";
import Pagination from "@/components/Pagination";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
  }
};

export const getStaticProps = async () => {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options);
  const data = await res.json();

  if (data) {
    return {
      props: {data}
    }
  }
}

export default function Home({data}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(21);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = data.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [
    {name:'Action', icon: 'action.svg'}, 
    {name:'MMO', icon: 'mmorpg.svg'},
    {name:'PvP', icon: '/pvp2.png'},
    {name:'Shooter', icon: 'shooter.svg'},
    {name:'Horror', icon: 'horror.svg'},
    {name:'Pixel', icon: '/pixel.png'},
    {name:'Card', icon: 'card.svg'},
    {name: 'Sports', icon: 'sports.svg'},
    {name:'Racing', icon: 'racing.svg'}, 
    {name:'Fighting', icon: '/fighting.png'},
    {name:'Tower Defense', icon: 'tower.svg'}
  ];

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton key={category.name} category={category.name} icon={category.icon} />
          ))}
        </div>
        <main className={styles.container}>
          {
            currentGames.map( (game) => (
              <GameCard key={game.id} game={game} />
            ))
          }
        </main>
      </div>
      <div className="paginationContainer">
        <Pagination
          itemsPerPage={gamesPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}