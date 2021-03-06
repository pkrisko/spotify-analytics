import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useAuth } from '../utils/auth/auth';

const getHashParams = () => {
  const hashParams: any = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const getSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  const { accessToken, refreshToken } = auth.tokens;

  useEffect(() => {
    const { access_token, refresh_token } = getHashParams();
    if (access_token && refresh_token) {
      auth.storeTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      router.push('/dashboard');
    }
    const searchParams = getSearchParams();
    if (searchParams.get('code') && searchParams.get('state')) {
      window.location.replace(`/api/callback?${searchParams}`);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Creator Analytics</a>
        </h1>
        <br/>
        <br/>
        <br/>
        <button className={styles.link}>
          <a href="/api/login">Login</a>
        </button>
      </main>

      <footer className={styles.footer}>
        DJ Z Entertainment Limited&trade;
      </footer>
    </div>
  )
}
