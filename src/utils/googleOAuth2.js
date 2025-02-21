// src/utils/googleOAuth2.js

import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';
import { ENV_VARS, env } from './env.js';

import fs from 'fs'; // for Değişken oauthConfig...

const oauthConfig = JSON.parse(fs.readFileSync('./google-oauth.json', 'utf-8'));

const googleOAuthClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID), // çevresel değişkenleri değiştiriyoruz
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET), // çevresel değişkenleri değiştiriyoruz
  redirectUri: oauthConfig.web.redirect_uris[0],
});
// buna bağlı olarak, src/utils/env.js dosyasına ilgili değerleri ENV_VARS'a eklememiz gerekiyor

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

//

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
