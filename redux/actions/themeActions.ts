import SplashScreen from 'react-native-splash-screen';
import {Dispatch} from 'redux';
import {asyncStorageService} from '../../services/asyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../../shared/AsyncStorageKeys';
import {DispatchType} from '../../shared/models';
import {themeActions} from '../slices/themeSlice';

export const getTheme = (preferedTheme: string | null | undefined): any => {
  return async (dispatch: Dispatch<DispatchType<boolean>>) => {
    asyncStorageService
      .getData(ASYNC_STORAGE_KEYS.APP_THEME)
      .then((isDark: boolean) => {
        if (isDark !== null) {
          dispatch(themeActions.setIsDarkTheme(isDark));
        } else {
          dispatch(themeActions.setIsDarkTheme(preferedTheme === 'dark'));
        }
        setTimeout(() => {
          SplashScreen.hide();
        }, 100);
      });
  };
};

export const setTheme = (isDark: boolean): any => {
  return async (dispatch: Dispatch<DispatchType<boolean>>) => {
    dispatch(themeActions.setIsDarkTheme(isDark));
    asyncStorageService.storeData(ASYNC_STORAGE_KEYS.APP_THEME, isDark);
  };
};
