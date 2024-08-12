import { atom } from "jotai";

export const gameSearchAtom = atom({});
export const currentGameAtom = atom([]);
export const favoritesAtom = atom([]);
export const userIdAtom = atom(null);
export const favoriteGamesAtom = atom([]);

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
  }  
};

export const overallGameDataAtom = atom(
    null,
    async (get, set, params) => {
        try {
            let gameData;

            const gameSearchDetails = get(gameSearchAtom);

            if ('id' in gameSearchDetails) {
                const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameSearchDetails.id}`, options);
                const data = await res.json();
                if (data.status == "Live") {
                    gameData = [data];
                } else {
                    throw new Error(`No game found with that ID.`);
                }
            }
            set(currentGameAtom, gameData);
        } catch (err) {
            throw(err)
        }
    }
);
