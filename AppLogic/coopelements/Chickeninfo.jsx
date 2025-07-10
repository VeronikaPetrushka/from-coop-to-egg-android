import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appinfo from '../coopconstants/appinfo';
import { card, button, shared } from '../coopconstants/coopstyles';
import { buttonBtn } from '../coopconstants/images';

const ChickenInfo = () => {
    const navigation = useNavigation();
    const [currentInfoIdx, setCurrentInfoIdx] = useState(0);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start();
    }, [currentInfoIdx]);

    const navButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: -30,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start(() => {
                if (currentInfoIdx < 2) {
                    setCurrentInfoIdx(currentInfoIdx + 1);
                } else {
                    navigation.navigate('Menuelement');
                }
            });
        });
    };

    const bannerRotate = useRef(new Animated.Value(0)).current;

    Animated.loop(
        Animated.sequence([
            Animated.timing(bannerRotate, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(bannerRotate, {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ])
    ).start();

    return (
        <View style={shared.container}>
            <Animated.View 
                style={[
                    card.container,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { translateY: slideAnim },
                            { scale: scaleAnim }
                        ],
                        height: '75%',
                        justifyContent: 'space-between'
                    }
                ]}
            >

                <View style={{width: '100%', paddingTop: 20, paddingHorizontal: 10}}>
                    <Animated.Text 
                        style={[
                            card.title,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateX: slideAnim }]
                            }
                        ]}
                    >
                        {appinfo[currentInfoIdx].title}
                    </Animated.Text>
                    
                    <Animated.Text 
                        style={[
                            card.info,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateX: slideAnim.interpolate({
                                    inputRange: [0, 30],
                                    outputRange: [0, 10]
                                }) }]
                            }
                        ]}
                    >
                        {appinfo[currentInfoIdx].info}
                    </Animated.Text>
                </View>
                
                <Animated.Image
                    source={appinfo[currentInfoIdx].banner}
                    style={[
                        card.banner,
                        {
                           opacity: fadeAnim,
                           transform: [
                                { 
                                    rotate: bannerRotate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['-1.5deg', '1.5deg']
                                    }) 
                                },
                                { scale: scaleAnim }
                            ]
                        }
                    ]}
                />
            </Animated.View>

            <Animated.View
                style={{
                    transform: [
                        { scale: buttonScale },
                        { 
                            rotate: buttonScale.interpolate({
                                inputRange: [0.95, 1],
                                outputRange: ['-2deg', '0deg']
                            }) 
                        }
                    ]
                }}
            >
                <TouchableOpacity
                    onPress={navButton}
                    style={[button.container, {marginTop: 30}]}
                    activeOpacity={0.7}
                >
                    <Image source={buttonBtn} style={button.image} />
                    <Text style={button.text}>
                        {currentInfoIdx < 2 ? 'Next' : 'Start'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default ChickenInfo;