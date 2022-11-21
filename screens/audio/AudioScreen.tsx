import React, {useEffect} from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sheikhHajrudinImage} from '../../assets/images';
import {namesOfAllah} from '../../data/data';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import {audioService} from '../../utils/downloadAudio';
import AudioPlayer from './components/AudioPlayer';

const AudioScreen = () => {
  const [playAudio] = useAudioPlayer();
  useEffect(() => {
    audioService.getSavedAudio().then(response => {
      console.log(response);
    });
  });
  return (
    <View>
      {namesOfAllah.map((name, index) => (
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
            <Text>{name.title}</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() => {
                audioService.donwloadAudio({
                  reciterName: 'Hajrudin Ahmetovic',
                  url: name.audio,
                  title: name.title,
                });
              }}>
              <Ionicons name={'download'} size={40} />
            </TouchableOpacity>
          </View>
        </TouchableHighlight>
      ))}
      <AudioPlayer />
    </View>
  );
};

export default AudioScreen;
