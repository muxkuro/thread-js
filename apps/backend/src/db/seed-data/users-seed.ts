import { encryptSync } from '~/packages/auth/helpers/helpers.js';

const hash = (password: string): string => encryptSync(password);

const usersSeed = [
  {
    email: 'demo@demo.com',
    password: hash('demo'),
    username: 'demo'
  },
  {
    email: 'gbottoms1@arizona.edu',
    password: hash('pxlxvUyyUjE'),
    username: 'jhon'
  },
  {
    email: 'cclears2@state.gov',
    password: hash('ioyLdS9Mdgj'),
    username: 'alex'
  },
  {
    email: 'htie3@chronoengine.com',
    password: hash('twn50kl'),
    username: 'kivi'
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    password: hash('0naQBpP9'),
    username: 'avocado'
  }
];

export { usersSeed };
