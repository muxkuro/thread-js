import { useSelector } from 'react-redux';

import { type store } from '~/libs/packages/store/store.js';

const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.instance.getState>>();

export { useAppSelector };
