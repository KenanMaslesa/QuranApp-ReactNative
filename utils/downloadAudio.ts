import {ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Audio {
  title: string;
  url: string;
  reciterName: string;
}
const donwloadAudio = async ({url, reciterName, title}: Audio) => {
  try {
    let dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.DocumentDir}/predavanja/${reciterName}/${title}.mp3`;
    const pathAndroid = `${dirs.DownloadDir}/predavanja/${reciterName}/${title}.mp3`;

    // verify that file not exists
    const exist = await RNFetchBlob.fs.exists(pathAndroid);
    if (exist) {
      return ToastAndroid.show('Vec preuzeto', ToastAndroid.LONG);
    }

    // download file
    const res = await RNFetchBlob.config({
      path,
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${reciterName} - ${title}`,
        description: `Preuzimanje : ${title}`,
        path: pathAndroid,
      },
    }).fetch('GET', url);

    // download completed msg
    ToastAndroid.show('Preuzimanje zavreseno', ToastAndroid.SHORT);

    // save new audio to player
    const audioPath = res.path();
    const newAudio = {
      reciterName,
      title,
      url: audioPath,
    };

    let savedAudios = await AsyncStorage.getItem('downloads');
    savedAudios = savedAudios != null ? JSON.parse(savedAudios) : [];
    const audioToSave = JSON.stringify([...savedAudios, newAudio]);
    await AsyncStorage.setItem('downloads', audioToSave);
  } catch (error) {
    ToastAndroid.show('ألغي التحميل', ToastAndroid.SHORT);
  }
};

async function checkSavedAuidos(audios) {
  const results = await Promise.all(
    audios.map(async audio => {
      const exist = await RNFetchBlob.fs.exists(audio.url);
      return {...audio, exist};
    }),
  );
  return results;
}

const deleteAudio = async (path: string) => {
  await RNFetchBlob.fs.unlink(path).then(response => {
    return response;
  });
};

async function getSavedAudio() {
  let savedValue = await AsyncStorage.getItem('downloads');
  const audios = savedValue != null ? JSON.parse(savedValue) : [];
  const checkedAuios = await checkSavedAuidos(audios);
  const filteredAudios = checkedAuios.filter(audio => audio.exist);

  // update audio
  await AsyncStorage.setItem('downloads', JSON.stringify(filteredAudios));
  return filteredAudios;
}

export const audioService = {
  getSavedAudio,
  donwloadAudio,
  deleteAudio,
};
