import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeMusic = async () => {
    try {
        await TrackPlayer.setupPlayer();

        const musicEnabled = await AsyncStorage.getItem('musicEnabled');
        if (musicEnabled === null || musicEnabled === 'true') {
            await playBackgroundMusic();
        }
    } catch (error) {
        console.error('Error initializing music player:', error);
    }
};

export const playBackgroundMusic = async () => {
    try {
        await TrackPlayer.reset();

        await TrackPlayer.add({
            id: 'background-music',
            url: require('../../assets/audio/chicken-music.mp3'),
            title: 'Background Music',
            artist: 'Your App',
        });

        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        await TrackPlayer.play();
    } catch (error) {
        console.error('Error playing background music:', error);
    }
};

export const stopBackgroundMusic = async () => {
    try {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
    } catch (error) {
        console.error('Error stopping background music:', error);
    }
};

export const toggleMusic = async () => {
    const currentState = await AsyncStorage.getItem('musicEnabled');
    const newState = currentState === 'false' ? 'true' : 'false';
    
    await AsyncStorage.setItem('musicEnabled', newState);
    
    if (newState === 'true') {
        await playBackgroundMusic();
    } else {
        await stopBackgroundMusic();
    }
  
  return newState;
};