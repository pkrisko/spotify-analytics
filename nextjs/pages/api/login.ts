import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const client_id = process.env.CLIENT_ID || '';
const stateKey: string = 'spotify_auth_state'
const keys: string[] = ['stateKey'];

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res, { keys });
  const state: string = generateRandomString(16);
  cookies.set(stateKey, state);
  const searchParams = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope: 'user-read-private user-read-email',
    redirect_uri: 'http://localhost:3000',
    state: state
  }).toString();
  res.redirect(`https://accounts.spotify.com/authorize?${searchParams}`);
}
