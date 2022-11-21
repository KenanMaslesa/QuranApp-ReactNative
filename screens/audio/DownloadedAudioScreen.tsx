import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sheikhHajrudinImage} from '../../assets/images';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import {audioService} from '../../utils/downloadAudio';
import AudioPlayer from './components/AudioPlayer';

const DownloadedAudioScreen = () => {
  const [playAudio, playAudioFile] = useAudioPlayer();
  const [downloadedAudio, setDownloadedAudio] = useState<any[]>([]);
  useEffect(() => {
    getDownloadedAudio();
  }, []);

  const deleteAudio = (path: string) => {
    audioService
      .deleteAudio(path)
      .then()
      .finally(() => {
        getDownloadedAudio();
      });
  };

  const getDownloadedAudio = () => {
    audioService.getSavedAudio().then(response => {
      console.log(response);
      setDownloadedAudio(response);
    });
  };
  return (
    <View>
      {downloadedAudio.map((name, index) => (
        <TouchableHighlight
          key={name.title}
          onPress={() => {
            playAudio(name.audio);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: 'darkgray',
              backgroundColor: 'white',
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={sheikhHajrudinImage}
            />
            <Text style={{margin: 5}}>{index + 1}.</Text>
            <Text>{name.url}</Text>
            {/* <Text>{name.title}</Text> */}
            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() => {
                deleteAudio(name.url);
              }}>
              <Ionicons name={'trash'} size={40} />
            </TouchableOpacity>
          </View>
        </TouchableHighlight>
      ))}
      <AudioPlayer />
    </View>
  );
};

export default DownloadedAudioScreen;
