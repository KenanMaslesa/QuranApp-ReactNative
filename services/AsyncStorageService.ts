import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (storageKey: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const removeData = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {
    // remove error
  }
  console.log(`${storageKey} removed`);
};

export const AsyncStorageService = {
  storeData,
  getData,
  removeData,
};
