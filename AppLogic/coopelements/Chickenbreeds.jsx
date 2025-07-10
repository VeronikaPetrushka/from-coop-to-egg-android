import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, ScrollView, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { button, card, shared } from '../coopconstants/coopstyles';
import { backBtn, buttonBtn, egg, meet, read, settingsBtn, star, starred } from '../coopconstants/images';
import breeds from '../coopconstants/breeds';
import Chickensettings from './Chickensettings';

const Chickenbreeds = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    
    const settingsScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsRotateAnim = useRef(new Animated.Value(0)).current;
    const backScaleAnim = useRef(new Animated.Value(1)).current;
    
    const cardAnimations = useRef(breeds.map(() => ({
        scale: new Animated.Value(0.95),
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(30),
        buttonScale: new Animated.Value(1)
    }))).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(settingsScaleAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(settingsScaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(settingsRotateAnim, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(backScaleAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(backScaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        if (isFocused) {
            const animations = breeds.map((_, index) => {
                return Animated.parallel([
                    Animated.spring(cardAnimations[index].translateY, {
                        toValue: 0,
                        friction: 6,
                        tension: 40,
                        delay: index * 80,
                        useNativeDriver: true,
                    }),
                    Animated.spring(cardAnimations[index].scale, {
                        toValue: 1,
                        friction: 6,
                        tension: 40,
                        delay: index * 80,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cardAnimations[index].opacity, {
                        toValue: 1,
                        duration: 400,
                        delay: index * 80,
                        useNativeDriver: true,
                    }),
                ]);
            });

            Animated.stagger(80, animations).start();
        }
    }, [isFocused]);

    const rotateInterpolate = settingsRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('FAVOURITE_BREEDS');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        
        if (isFocused) {
            loadFavorites();
        }
    }, [isFocused]);

    const toggleFavouriteChicken = async (chick, index) => {
        Animated.sequence([
            Animated.timing(cardAnimations[index].buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(cardAnimations[index].buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start(async () => {
            try {
                let newFavorites;
                const isFavorite = favorites.some(fav => fav.name === chick.name);
                
                if (isFavorite) {
                    newFavorites = favorites.filter(fav => fav.name !== chick.name);
                } else {
                    newFavorites = [...favorites, chick];
                }
                
                setFavorites(newFavorites);
                await AsyncStorage.setItem('FAVOURITE_BREEDS', JSON.stringify(newFavorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        });
    };

    const isChickFav = (chick) => {
        return favorites.some(fav => fav.name === chick.name);
    };
    
    const handleCardPressIn = (index) => {
        Animated.spring(cardAnimations[index].scale, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handleCardPressOut = (index) => {
        Animated.spring(cardAnimations[index].scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={[shared.container, {paddingTop: 0}]}>
            <ScrollView style={{ width: '100%', paddingTop: 100 }}>
                {breeds.map((chick, idx) => (
                    <Animated.View 
                        key={idx}
                        style={[
                            card.container,
                            {
                                marginBottom: 12,
                                padding: 10,
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                height: 160,
                                transform: [
                                    { scale: cardAnimations[idx].scale },
                                    { translateY: cardAnimations[idx].translateY }
                                ],
                                opacity: cardAnimations[idx].opacity
                            }
                        ]}
                        onStartShouldSetResponder={() => true}
                        onResponderGrant={() => handleCardPressIn(idx)}
                        onResponderRelease={() => handleCardPressOut(idx)}
                    >
                        <Image
                            source={chick.chicken}
                            style={card.chickenImg}
                        />

                        <View style={{ width: '68%', height: '100%', justifyContent: 'space-between' }}>
                            
                            <Text style={card.chickenName}>{chick.name}</Text>

                            <View style={[shared.row, {justifyContent: 'space-between', width: '100%', alignItems: 'flex-start'}]}>
                                <View style={shared.row}>
                                    <Image source={egg} style={card.eggIcon} />
                                    <Text style={[card.chickenText, {fontSize: 10.5}]}>{chick.eggsPerYear}/year</Text>
                                </View>

                                <View>
                                    <View style={shared.row}>
                                        <Image source={meet} style={card.meetIcon} />
                                        <Text style={[card.chickenText, {fontSize: 10.5}]}>H: {chick.meatYield.hen}</Text>
                                    </View>
                                    <View style={shared.row}>
                                        <Image source={meet} style={card.meetIcon} />
                                        <Text style={[card.chickenText, {fontSize: 10.5}]}>R: {chick.meatYield.rooster}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[shared.row, { justifyContent: 'space-between', width: '100%' }]}>
                                <Animated.View style={{ transform: [{ scale: cardAnimations[idx].buttonScale }], width: '49%' }}>
                                    <TouchableOpacity
                                        style={[button.container, { width: '100%', height: 50 }]}
                                        onPress={() => toggleFavouriteChicken(chick, idx)}
                                        activeOpacity={0.7}
                                    >
                                        <Image source={buttonBtn} style={button.image} />
                                        <View style={shared.row}>
                                            <Image 
                                                source={isChickFav(chick) ? starred : star} 
                                                style={card.starIcon} 
                                            />
                                            <Text style={card.chickenText}>
                                                {isChickFav(chick) ? 'Saved' : 'Save'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>

                                <TouchableOpacity
                                    style={[button.container, { width: '49%', height: 50 }]}
                                    onPress={() => navigation.navigate('BreedInfoelement', {chicken: chick})}
                                    activeOpacity={0.7}
                                >
                                    <Image source={buttonBtn} style={button.image} />
                                    <View style={shared.row}>
                                        <Image source={read} style={card.readIcon} />
                                        <Text style={card.chickenText}>Read</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                ))}
                
                <View style={{height: 200}} />
            </ScrollView>

            {/* Bottom buttons */}
            <Animated.View
                style={[
                    button.settingsBtn,
                    { left: 30 },
                    { transform: [{ scale: backScaleAnim }] }
                ]}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.6}
                >
                    <Image source={backBtn} style={button.settings} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View
                style={[
                    button.settingsBtn,
                    {
                        transform: [
                            { scale: settingsScaleAnim },
                            { rotate: rotateInterpolate },
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={() => setSettingsOpen(true)}
                    activeOpacity={0.6}
                >
                    <Image source={settingsBtn} style={button.settings} />
                </TouchableOpacity>
            </Animated.View>

            <Chickensettings opened={settingsOpen} onClose={() => setSettingsOpen(false)} />

        </View>
    )
};

export default Chickenbreeds;