import TrackPlayer, {Capability} from 'react-native-track-player';

async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.Skip,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.Skip,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
  } catch (error) {}
}

async function playAudio(audioUrl: string) {
  try {
    // TrackPlayer.reset();
    await TrackPlayer.add({
      url: audioUrl,
    });
    await TrackPlayer.play();
  } catch (error) {}
}

export const audioService = {
  setupPlayer,
  playAudio,
};
