import { Card, Form, Alert, Button } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { userIdAtom, favoriteGamesAtom } from "@/store/atoms";
import { getFavoriteGames, getFavorites } from "@/lib/userData";

export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserId, setCurrentUserId] = useAtom(userIdAtom);
  const router = useRouter();

  const [favoriteGames, setFavoriteGames] = useAtom(favoriteGamesAtom);

  async function updateGames(userId) {
    let favoriteGameIds = await getFavorites(userId);

    // setFavoriteGames is being sent in as a callback function so that it runs after we have retrieved the games (i.e. promise is resolved)
    await getFavoriteGames(favoriteGameIds, setFavoriteGames);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const userId = await authenticateUser(user, password);
      setCurrentUserId(userId);
      await updateGames(userId);
      router.push("/favorites");
    }catch(err){
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <p>Don't have an account yet? <Link href={`/register`}>Sign Up</Link></p>
        </Card.Body>
      </Card>
      
      <br/>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <br/>
          <Form.Control 
            type="text" 
            value={user} 
            id="userName" 
            name="userName" 
            onChange={e => setUser(e.target.value)} 
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <br/>
          <Form.Control 
            type="password" 
            value={password} 
            id="password" 
            name="password" 
            onChange={e => setPassword(e.target.value)} 
          />
        </Form.Group>

        {warning && <>
          <br/>
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br/>
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}