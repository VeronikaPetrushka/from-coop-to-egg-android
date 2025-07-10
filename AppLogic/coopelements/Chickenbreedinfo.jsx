import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing, Dimensions, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, card, shared } from '../coopconstants/coopstyles';
import { backBtn, egg, meet, settingsBtn, shareBtn, star, starred } from '../coopconstants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chickensettings from './Chickensettings';

const { height } = Dimensions.get('window');

const Chickenbreedinfo = ({ chicken }) => {
    const navigation = useNavigation();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [currentInfoType, setCurrentInfoType] = useState('general');
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);
    
    const backScaleAnim = useRef(new Animated.Value(1)).current;
    const shareScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsRotateAnim = useRef(new Animated.Value(0)).current;
    
    const backFadeAnim = useRef(new Animated.Value(0)).current;
    const shareFadeAnim = useRef(new Animated.Value(0)).current;
    const settingsFadeAnim = useRef(new Animated.Value(0)).current;
    
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const cardFadeAnim = useRef(new Animated.Value(0)).current;
    const cardSlideAnim = useRef(new Animated.Value(30)).current;
    
    const tabGeneralAnim = useRef(new Animated.Value(1)).current;
    const tabFeedAnim = useRef(new Animated.Value(1)).current;

    const star1Anim = useRef(new Animated.Value(1)).current;
    const star2Anim = useRef(new Animated.Value(1)).current;
    const star3Anim = useRef(new Animated.Value(1)).current;

     const ratingStorageKey = `rating_${chicken.name}`;

    const loadRating = async () => {
        try {
            const savedRating = await AsyncStorage.getItem(ratingStorageKey);
            if (savedRating !== null) {
                setRating(parseInt(savedRating));
            }
        } catch (error) {
            console.error('Failed to load rating:', error);
        }
    };

    const saveRating = async (newRating) => {
        try {
            await AsyncStorage.setItem(ratingStorageKey, newRating.toString());
        } catch (error) {
            console.error('Failed to save rating:', error);
        }
    };

    useEffect(() => {
        loadRating();
        
        // Button animations
        const createPulseAnimation = (anim) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1.1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        // Card entry animation
        Animated.parallel([
            Animated.spring(cardSlideAnim, {
                toValue: 0,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(cardScaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(cardFadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        // Button animations
        createPulseAnimation(backScaleAnim).start();
        createPulseAnimation(shareScaleAnim).start();
        createPulseAnimation(settingsScaleAnim).start();

        Animated.loop(
            Animated.timing(settingsRotateAnim, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Staggered button fade-in
        Animated.stagger(200, [
            Animated.timing(backFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(shareFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(settingsFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();
    }, []);

    const rotateInterpolate = settingsRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const shareChickenBreedInfo = async () => {
        try {
            const result = await Share.share({
                message: `Check out this chicken breed: ${chicken.name}\n\nEggs per year: ${chicken.eggsPerYear}\nMeat yield: Hen ${chicken.meatYield.hen}, Rooster ${chicken.meatYield.rooster}\n\n${chicken.info}`,
                title: chicken.name,
            });
            
            if (result.action === Share.sharedAction) {
                Animated.sequence([
                    Animated.timing(shareScaleAnim, {
                        toValue: 1.3,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.spring(shareScaleAnim, {
                        toValue: 1,
                        friction: 3,
                        tension: 40,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    const handleStarPress = async (selectedRating) => {
        const newRating = rating === selectedRating ? 0 : selectedRating;
        setRating(newRating);
        
        await saveRating(newRating);
        
        const starAnim = selectedRating === 1 ? star1Anim : 
                         selectedRating === 2 ? star2Anim : star3Anim;
        
        Animated.sequence([
            Animated.timing(starAnim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(starAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleTabPress = (tab) => {
        setCurrentInfoType(tab);
        
        tabGeneralAnim.setValue(1);
        tabFeedAnim.setValue(1);
        
        Animated.parallel([
            Animated.sequence([
                Animated.spring(tab === 'general' ? tabGeneralAnim : tabFeedAnim, {
                    toValue: 0.95,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(tab === 'general' ? tabGeneralAnim : tabFeedAnim, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]),
            Animated.spring(tab === 'general' ? tabFeedAnim : tabGeneralAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const renderStars = () => {
        return [1, 2, 3].map((starNum) => {
            const starScale = starNum === 1 ? star1Anim : 
                             starNum === 2 ? star2Anim : star3Anim;
            
            return (
                <TouchableOpacity
                    key={starNum}
                    onPress={() => handleStarPress(starNum)}
                    onPressIn={() => setTempRating(starNum)}
                    onPressOut={() => setTempRating(0)}
                    activeOpacity={0.7}
                    style={{ marginHorizontal: 5 }}
                >
                    <Animated.View style={{ transform: [{ scale: starScale }] }}>
                        <Image 
                            source={(tempRating || rating) >= starNum ? starred : star} 
                            style={card.starIcon}
                        />
                    </Animated.View>
                </TouchableOpacity>
            );
        });
    };

    return (
        <View style={[shared.container, {paddingTop: height * 0.1}]}>
            <Animated.View 
                style={[
                    card.container, 
                    {
                        height: '75%',
                        transform: [
                            { translateY: cardSlideAnim },
                            { scale: cardScaleAnim }
                        ],
                        opacity: cardFadeAnim
                    }
                ]}
            >
                <View style={[shared.row, {alignItems: 'flex-start', justifyContent: 'space-between', padding: 10}]}>
                    <Image
                        source={chicken.chicken}
                        style={card.chickenImg}
                    />

                    <View style={{ width: '68%', justifyContent: 'space-between' }}>               
                        <Text style={[card.chickenName, {marginBottom: 16}]}>{chicken.name}</Text>

                        <View style={[shared.row, {marginBottom: 12}]}>
                            <Image source={egg} style={card.eggIcon} />
                            <Text style={[card.chickenText, {fontSize: 10.5}]}>{chicken.eggsPerYear}/year</Text>
                        </View>

                        <View>
                            <View style={shared.row}>
                                <Image source={meet} style={card.meetIcon} />
                                <Text style={[card.chickenText, {fontSize: 10.5}]}>Hen: {chicken.meatYield.hen}</Text>
                            </View>
                            <View style={shared.row}>
                                <Image source={meet} style={card.meetIcon} />
                                <Text style={[card.chickenText, {fontSize: 10.5}]}>Rooster: {chicken.meatYield.rooster}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={[shared.row, {width: '100%', justifyContent: 'space-between'}]}>
                    <Animated.View style={{ transform: [{ scale: tabGeneralAnim }], width: '50%' }}>
                        <TouchableOpacity
                            style={[
                                button.infoBtn,
                                currentInfoType === 'general' && { backgroundColor: '#F7A808' },
                                {borderTopRightRadius: 20}
                            ]}
                            onPress={() => handleTabPress('general')}
                            activeOpacity={0.7}
                        >
                            <Text style={[card.chickenName, currentInfoType === 'general' && {color: '#923A00'}]}>General Info</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    
                    <Animated.View style={{ transform: [{ scale: tabFeedAnim }], width: '50%' }}>
                        <TouchableOpacity
                            style={[
                                button.infoBtn,
                                currentInfoType === 'feed' && { backgroundColor: '#F7A808' },
                                {borderTopLeftRadius: 20}
                            ]}
                            onPress={() => handleTabPress('feed')}
                            activeOpacity={0.7}
                        >
                            <Text style={[card.chickenName, currentInfoType === 'feed' && {color: '#923A00'}]}>Feed & Care</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <Animated.View 
                    style={{
                        width: '100%',
                        backgroundColor: '#C34E01',
                        flexGrow: 1,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        paddingTop: 20,
                        paddingHorizontal: 10,
                        opacity: cardFadeAnim
                    }}
                >
                    {
                        currentInfoType === 'general' ? (
                            <Text style={card.chickenName}>{chicken.info}</Text>
                        ) : (
                            <Text style={card.chickenName}>{chicken.feedCare}</Text>
                        )
                    }

                    <View style={[shared.row, {alignSelf: 'center', marginTop: 15, position: 'absolute', bottom: 30}]}>
                        {renderStars()}
                    </View>
                </Animated.View>
            </Animated.View>

            {/* Bottom buttons */}
            <Animated.View
                style={[
                    button.settingsBtn,
                    { 
                        left: 30,
                        opacity: backFadeAnim,
                        transform: [{ scale: backScaleAnim }] 
                    }
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
                        left: '45%', 
                        right: '45%',
                        alignSelf: 'center',
                        opacity: shareFadeAnim,
                        transform: [{ scale: shareScaleAnim }] 
                    }
                ]}
            >
                <TouchableOpacity
                    onPress={shareChickenBreedInfo}
                    activeOpacity={0.6}
                >
                    <Image source={shareBtn} style={button.settings} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View
                style={[
                    button.settingsBtn,
                    {
                        opacity: settingsFadeAnim,
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

export default Chickenbreedinfo;