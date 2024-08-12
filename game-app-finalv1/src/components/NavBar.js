import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { userIdAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { signOutUser } from '@/lib/authenticate';
import { favoritesAtom } from '@/store/atoms';

const NavBar = () => {
  const [userId, setUserId] = useAtom(userIdAtom);
  const [, setFavoritesList] = useAtom(favoritesAtom);
  const router = useRouter();

  const handleSignOut = async () => {
    const success = await signOutUser();
    if (success) {
      setUserId(null);
      setFavoritesList([]);
      router.push('/login');
    }  else {
      console.error("Sign out failed");
    }
  }

  return (
    <Navbar>
      { userId ? (
        <Nav>
          <Link href="/"> <Image src="home.svg" alt="My Icon" width={30} height={25} /></Link>
          <Link href="/favorites">Favorites</Link>
          {userId && (
            <Button variant="primary" className="pull-right" onClick={handleSignOut}>Sign Out</Button>
          )}
        </Nav>
        ) : (
          <Nav>
            <Link href="/"> <Image src="home.svg" alt="My Icon" width={30} height={25} /></Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </Nav>
        )}
    </Navbar>
  );
}

export default NavBar;
