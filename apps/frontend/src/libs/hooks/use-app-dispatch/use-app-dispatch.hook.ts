import { useDispatch } from 'react-redux';

import { type store } from '~/libs/packages/store/store.js';

const useAppDispatch = useDispatch.withTypes<typeof store.instance.dispatch>();

export { useAppDispatch };
