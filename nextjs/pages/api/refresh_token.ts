// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const client_id = process.env.CLIENT_ID || '';
const client_secret = process.env.CLIENT_SECRET || '';
const stateKey = 'spotify_auth_state';
const keys: string[] = ['stateKey'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  const auth = `${client_id}:${client_secret}`;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': `Basic ${(new Buffer(auth).toString('base64'))}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  };

  try {
    const response = await axios(authOptions);
    var access_token = response.data.access_token;
    res.send({
      'access_token': access_token
    });
  } catch(err) {
    console.error('some err');
    res.send('lol');
  }
}
