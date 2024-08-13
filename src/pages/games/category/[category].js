import React, { useState } from 'react';
import Image from 'next/image';
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import GameCard from '@/components/GameCard';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
  }
};

export const getServerSideProps = async (context) => {
  const category = context.params.category;
  
  try {
    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    if (!res.ok) {
      throw new Error(`Failed to fetch game data. Status: ${res.status}`);
    }
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) {
      return {notFound: true};
    }
    return {
      props: { games: data }
    }
  } catch(error) {
    console.error('Error fetching games data:', error);
    return {notFound: true};
  }
}

export default function CategoryGames({ games }) { 
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(10);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <>
      <main className={styles.container}>
        {currentGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </main>
      <Pagination 
        itemsPerPage={gamesPerPage}
        totalItems={games.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  )
}
