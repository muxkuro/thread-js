import { encryptSync } from '~/packages/auth/helpers/helpers.js';

const hash = (password: string): string => encryptSync(password);

const usersSeed = [
  {
    email: 'demo@demo.com',
    username: 'demo',
    password: hash('demo')
  },
  {
    email: 'gbottoms1@arizona.edu',
    username: 'jhon',
    password: hash('pxlxvUyyUjE')
  },
  {
    email: 'cclears2@state.gov',
    username: 'alex',
    password: hash('ioyLdS9Mdgj')
  },
  {
    email: 'htie3@chronoengine.com',
    username: 'kivi',
    password: hash('twn50kl')
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    username: 'avocado',
    password: hash('0naQBpP9')
  }
];

export { usersSeed };
