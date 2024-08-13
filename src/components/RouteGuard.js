import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { favoriteGamesAtom, userIdAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { getFavoriteGames, getFavorites } from '@/lib/userData';
import { readToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/register'];

export default function RouteGuard(props) {
  const [currentUserId, setCurrentUserId] = useAtom(userIdAtom);
  const [authorized, setAuthorized] = useState(false);
  const [favoriteGames, setFavoriteGames] = useAtom(favoriteGamesAtom);
  const router = useRouter();

  async function updateAtoms() {
    let userId = "";
    let favoriteGameIds = "";
    const decoded = readToken();

    if (decoded) {
      userId = decoded._id;
      favoriteGameIds = await getFavorites(userId);
    }
    await getFavoriteGames(favoriteGameIds, setFavoriteGames);
    setCurrentUserId(userId);
  }

  useEffect(() => {
    updateAtoms();
    // on initial load - run auth check 
    authCheck(router.pathname);
    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)
    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      const path = url.split('?')[0];
      if (!isAuthenticated() && !isPublicPath(path)) {
          setAuthorized(false);
          router.push("/login");
      } else {
          setAuthorized(true);
      }
  }

  function isPublicPath(path) {
    return PUBLIC_PATHS.includes(path) || path.startsWith('/game/') || path.startsWith('/games/');
  }

  return (
    <>
      {authorized && props.children}
    </>
  )
}