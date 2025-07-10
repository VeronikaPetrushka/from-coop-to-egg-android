import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, Image, Animated, Dimensions, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, shared } from '../coopconstants/coopstyles';
import { buttonBtn, settingsBtn } from '../coopconstants/images';
import Chickensettings from './Chickensettings';
import menu from '../coopconstants/menu';

const { height } = Dimensions.get('window');

const Chickenmenu = () => {
    const navigation = useNavigation();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const buttonAnimations = useRef(menu.map(() => new Animated.Value(0))).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        const buttonAnimationsSequence = buttonAnimations.map((anim, index) => {
            return Animated.spring(anim, {
                toValue: 1,
                friction: 5,
                tension: 70,
                delay: index * 100,
                useNativeDriver: true,
            });
        });

        Animated.stagger(100, buttonAnimationsSequence).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={[shared.container, { paddingTop: height * 0.15, opacity: fadeAnim }]}>
            {menu.map((item, idx) => {
                const translateY = buttonAnimations[idx]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                });

                const opacity = buttonAnimations[idx]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                });

                return (
                    <Animated.View
                        key={idx}
                        style={{
                            transform: [{ translateY }],
                            opacity,
                            width: '100%',
                            marginBottom: 8,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                Animated.sequence([
                                    Animated.timing(buttonAnimations[idx], {
                                        toValue: 0.9,
                                        duration: 100,
                                        useNativeDriver: true,
                                    }),
                                    Animated.spring(buttonAnimations[idx], {
                                        toValue: 1,
                                        friction: 3,
                                        tension: 40,
                                        useNativeDriver: true,
                                    }),
                                ]).start(() => navigation.navigate(item.element));
                            }}
                            activeOpacity={0.7}
                            style={[button.container, { width: '100%', height: 114 }]}
                        >
                            <Image source={buttonBtn} style={button.image} />
                            <Text style={button.text}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}

            <Animated.View
                style={[
                    button.settingsBtn,
                    {
                        transform: [
                            { scale: scaleAnim },
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
            
        </Animated.View>
    );
};

export default Chickenmenu;