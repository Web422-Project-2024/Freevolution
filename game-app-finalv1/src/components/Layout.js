import NavBar from "./NavBar";
import Head from "next/head";
import Search from "./Search";
import Image from 'next/image';
import styles from '../styles/home.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Freevolution</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.icon}>
          <Image src="new.svg" alt="My Icon" width={30} height={25} />
          </div>
          <div className={styles.brandName}>FREEVOLUTION</div>
        </div>
        <div className={styles.centerSection}>
          <Search />
        </div>
        <div className={styles.rightSection}>
          <NavBar />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}