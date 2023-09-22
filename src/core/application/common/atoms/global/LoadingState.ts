
import { atom } from 'recoil';

export const LoadingState = atom({
  key: 'Loading_State',
  default: {
    uri: '',
    loading: false,
  },
});