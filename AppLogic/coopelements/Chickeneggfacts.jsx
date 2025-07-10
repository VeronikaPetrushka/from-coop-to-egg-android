import { useNavigation } from "@react-navigation/native"
import { button, card, facts, shared } from "../coopconstants/coopstyles"
import { buttonBtn, leftBtn, read, rightBtn, backBtn, settingsBtn } from "../coopconstants/images";
import { useState, useRef, useEffect } from "react";
import eggFacts from "../coopconstants/eggfacts";
import { View, Text, TouchableOpacity, Image, Animated, Easing } from "react-native";
import Chickensettings from "./Chickensettings";

const Chickeneggfacts = () => {
    const navigation = useNavigation();
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [settingsOpen, setSettingsOpen] = useState(false);
    
    const settingsScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsRotateAnim = useRef(new Animated.Value(0)).current;
    const backScaleAnim = useRef(new Animated.Value(1)).current;
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const cardOpacityAnim = useRef(new Animated.Value(0)).current;
    const leftBtnAnim = useRef(new Animated.Value(1)).current;
    const rightBtnAnim = useRef(new Animated.Value(1)).current;
    const readBtnAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Card entrance animation
        Animated.parallel([
            Animated.spring(cardScaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 60,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();

        // Settings button animations
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

        // Back button animation
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

        // Read button pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(readBtnAnim, {
                    toValue: 1.05,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(readBtnAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(readBtnAnim, {
                    toValue: 1.05,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(readBtnAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
            ])
        ).start();
    }, []);

    useEffect(() => {
        cardScaleAnim.setValue(0.95);
        cardOpacityAnim.setValue(0);

        Animated.parallel([
            Animated.spring(cardScaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 60,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();

        // Button press animations
        Animated.sequence([
            Animated.timing(leftBtnAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(leftBtnAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();

        Animated.sequence([
            Animated.timing(rightBtnAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(rightBtnAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    }, [currentFactIndex]);

    const rotateInterpolate = settingsRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handlePrevFact = () => {
        if (currentFactIndex > 0) {
            setCurrentFactIndex(prev => prev - 1);
        }
    };

    const handleNextFact = () => {
        if (currentFactIndex < eggFacts.length - 1) {
            setCurrentFactIndex(prev => prev + 1);
        }
    };

    const handleReadPress = () => {
        Animated.sequence([
            Animated.timing(readBtnAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(readBtnAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start(() => {
            navigation.navigate('FactReadelement', {eggFact: eggFacts[currentFactIndex]});
        });
    };

    return (
        <View style={shared.container}>
            <View style={[shared.row, { width: '100%', height: '68%', justifyContent: 'space-between' }]}>
                
                <Animated.View style={{ transform: [{ scale: leftBtnAnim }] }}>
                    <TouchableOpacity
                        onPress={handlePrevFact}
                        disabled={currentFactIndex === 0}
                    >
                        <Image
                            source={leftBtn}
                            style={[button.left, currentFactIndex === 0 && { opacity: 0.6 }]}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    style={[
                        card.container, 
                        { 
                            width: '70%', 
                            height: '100%', 
                            justifyContent: 'space-between', 
                            paddingVertical: 20, 
                            paddingHorizontal: 35,
                            transform: [{ scale: cardScaleAnim }],
                            opacity: cardOpacityAnim
                        }
                    ]}
                >
                    <Text style={[card.chickenName, { fontSize: 28, lineHeight: 32 }]}>{eggFacts[currentFactIndex].title}</Text>
                    <Image
                        source={eggFacts[currentFactIndex].image}
                        style={facts.image}
                    />
                    <Animated.View style={{ transform: [{ scale: readBtnAnim }] }}>
                        <TouchableOpacity
                            style={[button.container, { width: 160, height: 72 }]}
                            onPress={handleReadPress}
                            activeOpacity={0.7}
                        >
                            <Image source={buttonBtn} style={button.image} />
                            <View style={shared.row}>
                                <Image source={read} style={[card.readIcon, {width: 24, height: 24}]} />
                                <Text style={[card.chickenText, {fontSize: 16}]}>Read</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: rightBtnAnim }] }}>
                    <TouchableOpacity
                        onPress={handleNextFact}
                        disabled={currentFactIndex === eggFacts.length - 1}
                    >
                        <Image
                            source={rightBtn}
                            style={[button.left, currentFactIndex === eggFacts.length - 1 && { opacity: 0.6 }]}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>

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

export default Chickeneggfacts;