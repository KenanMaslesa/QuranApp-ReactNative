import {Dispatch} from 'redux';
import {asyncStorageService} from '../../services/asyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../../shared/AsyncStorageKeys';
import {DispatchType, Qari} from '../../shared/models';
import {quranPlayerActions} from '../slices/quranPlayerSlice';

export const getSelectedQari = (): any => {
  return async (dispatch: Dispatch<DispatchType<Qari>>) => {
    asyncStorageService
      .getData(ASYNC_STORAGE_KEYS.SELECTED_QARI)
      .then((selectedQari: Qari) => {
        if (selectedQari) {
          dispatch(quranPlayerActions.setSelectedQari(selectedQari));
        }
      });
  };
};

export const setSelectedQari = (qari: Qari): any => {
  return async (dispatch: Dispatch<DispatchType<Qari>>) => {
    dispatch(quranPlayerActions.setSelectedQari(qari));
    asyncStorageService.storeData(ASYNC_STORAGE_KEYS.SELECTED_QARI, qari);
  };
};
