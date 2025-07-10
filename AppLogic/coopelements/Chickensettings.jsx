import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, Switch, Share, Animated, Vibration } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { button, card, settings, shared } from "../coopconstants/coopstyles";
import { close, off, share } from "../coopconstants/images";
import { playBackgroundMusic, stopBackgroundMusic } from '../coopconstants/sound';

const Chickensettings = ({ opened, onClose }) => {
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [notification, setNotification] = useState('');
    const [notificationOpacity] = useState(new Animated.Value(0));
    
    const rowAnimations = Array(5).fill().map(() => new Animated.Value(0));

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.multiGet([
                'musicEnabled',
                'vibrationEnabled'
            ]);
            
            if (settings[0][1] !== null) {
                const music = settings[0][1] === 'true';
                setMusicEnabled(music);
                if (music) {
                    await playBackgroundMusic();
                } else {
                    await stopBackgroundMusic();
                }
            }
            
            if (settings[1][1] !== null) {
                setVibrationEnabled(settings[1][1] === 'true');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const toggleMusic = async (value) => {
        setMusicEnabled(value);
        await AsyncStorage.setItem('musicEnabled', value.toString());
        if (value) {
            await playBackgroundMusic();
        } else {
            await stopBackgroundMusic();
        }
        if (vibrationEnabled) Vibration.vibrate(50);
    };

    const toggleVibration = async (value) => {
        setVibrationEnabled(value);
        await AsyncStorage.setItem('vibrationEnabled', value.toString());
        if (value) Vibration.vibrate(50);
    };

    const clearFavorites = async () => {
        try {
            await AsyncStorage.removeItem('FAVOURITE_BREEDS');
            showNotification('The saved are clear');
            if (vibrationEnabled) Vibration.vibrate(100);
        } catch (error) {
            console.error('Error clearing favorites:', error);
        }
    };

    const resetRecord = async () => {
        try {
            await AsyncStorage.removeItem('MINI_GAME_BEST_SCORE');
            showNotification('Game record is reset');
            if (vibrationEnabled) Vibration.vibrate(100);
        } catch (error) {
            console.error('Error resetting record:', error);
        }
    };

    const shareApp = async () => {
        try {
            await Share.share({
                message: 'Check out this awesome Chicken Coop app!',
                url: 'https://apps.apple.com/us/app/from-coop-to-egg/id6748466835',
                title: 'Chicken Coop App'
            });
            if (vibrationEnabled) Vibration.vibrate(50);
        } catch (error) {
            console.error('Error sharing app:', error);
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        Animated.sequence([
            Animated.timing(notificationOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(notificationOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => setNotification(''));
    };

    useEffect(() => {
        if (opened) {
            loadSettings();
            rowAnimations.forEach((anim, index) => {
                Animated.spring(anim, {
                    toValue: 1,
                    delay: index * 100,
                    friction: 5,
                    useNativeDriver: true,
                }).start();
            });
        } else {
            rowAnimations.forEach(anim => anim.setValue(0));
        }
    }, [opened]);

    return (
        <Modal
            visible={opened}
            transparent
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={settings.container}>
                <View style={[card.container, {width: '90%', padding: 10, paddingBottom: 50}]}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={close} style={button.closeBtn} />
                    </TouchableOpacity>

                    {/* Music Setting */}
                    <Animated.View 
                        style={[
                            shared.row, 
                            { 
                                justifyContent: 'space-between', 
                                width: '90%', 
                                alignSelf: 'center', 
                                marginBottom: 16,
                                transform: [{ 
                                    translateX: rowAnimations[0].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0]
                                    }) 
                                }],
                                opacity: rowAnimations[0]
                            }
                        ]}
                    >
                        <Text style={settings.text}>{'Music'.toUpperCase()}</Text>
                        <Switch 
                            value={musicEnabled}
                            onValueChange={toggleMusic}
                            trackColor={{ false: "#767577", true: "#F7A808" }}
                            thumbColor={musicEnabled ? "#923A00" : "#f4f3f4"}
                        />
                    </Animated.View>

                    {/* Vibration Setting */}
                    <Animated.View 
                        style={[
                            shared.row, 
                            { 
                                justifyContent: 'space-between', 
                                width: '90%', 
                                alignSelf: 'center', 
                                marginBottom: 10,
                                transform: [{ 
                                    translateX: rowAnimations[1].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0]
                                    }) 
                                }],
                                opacity: rowAnimations[1]
                            }
                        ]}
                    >
                        <Text style={settings.text}>{'Vibration'.toUpperCase()}</Text>
                        <Switch 
                            value={vibrationEnabled}
                            onValueChange={toggleVibration}
                            trackColor={{ false: "#767577", true: "#F7A808" }}
                            thumbColor={vibrationEnabled ? "#923A00" : "#f4f3f4"}
                        />
                    </Animated.View>

                    {/* Clear Favorites */}
                    <Animated.View 
                        style={[
                            shared.row, 
                            { 
                                justifyContent: 'space-between', 
                                width: '90%', 
                                alignSelf: 'center', 
                                marginBottom: 3,
                                transform: [{ 
                                    translateX: rowAnimations[2].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0]
                                    }) 
                                }],
                                opacity: rowAnimations[2]
                            }
                        ]}
                    >
                        <Text style={settings.text}>{'Clear saved'.toUpperCase()}</Text>
                        <TouchableOpacity onPress={clearFavorites}>
                            <Image source={off} style={settings.offBtn} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Reset Record */}
                    <Animated.View 
                        style={[
                            shared.row, 
                            { 
                                justifyContent: 'space-between', 
                                width: '90%', 
                                alignSelf: 'center', 
                                marginBottom: 3,
                                transform: [{ 
                                    translateX: rowAnimations[3].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0]
                                    }) 
                                }],
                                opacity: rowAnimations[3]
                            }
                        ]}
                    >
                        <Text style={settings.text}>{'Reset record'.toUpperCase()}</Text>
                        <TouchableOpacity onPress={resetRecord}>
                            <Image source={off} style={settings.offBtn} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Share App */}
                    <Animated.View 
                        style={[
                            shared.row, 
                            { 
                                justifyContent: 'space-between', 
                                width: '90%', 
                                alignSelf: 'center', 
                                marginBottom: 3,
                                transform: [{ 
                                    translateX: rowAnimations[4].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0]
                                    }) 
                                }],
                                opacity: rowAnimations[4]
                            }
                        ]}
                    >
                        <Text style={settings.text}>{'Share app'.toUpperCase()}</Text>
                        <TouchableOpacity onPress={shareApp}>
                            <Image source={share} style={settings.offBtn} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Notification */}
                    <Animated.View 
                        style={[
                            {
                                position: 'absolute',
                                bottom: 10,
                                alignSelf: 'center',
                                opacity: notificationOpacity
                            }
                        ]}
                    >
                        <Text style={card.chickenName}>{notification}</Text>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
};

export default Chickensettings;