// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import Cookies from 'cookies';

const client_id = process.env.CLIENT_ID || '';
const client_secret = process.env.CLIENT_SECRET || '';
const stateKey = 'spotify_auth_state';
const keys: string[] = ['stateKey'];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const cookies = new Cookies(req, res, { keys });
    const storedState = cookies.get(stateKey) || null;

    // State mismatch
    if (state === null || state !== storedState) {
        res.redirect('/#?error=state_mismatch');
    } else {
        try {
            // Delete cookie
            cookies.set(stateKey);
            const auth = `${client_id}:${client_secret}`;
            const options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${(new Buffer(auth).toString('base64'))}`
                }
            };
            const response = await axios.post(
                `https://accounts.spotify.com/api/token?`,
                new URLSearchParams({
                    code: `${code}`,
                    redirect_uri: 'http://localhost:3000',
                    grant_type: 'authorization_code'
                }).toString(),
                options
            );
            const { access_token, refresh_token } = response.data;
            // pass the token to the browser to make requests from there
            res.redirect(`/#${new URLSearchParams({ access_token, refresh_token }).toString()}`);
        } catch (err) {
            console.error('axios encounterered error', err);
            res.redirect('/#?error=invalid_token');
        }
    }
}
