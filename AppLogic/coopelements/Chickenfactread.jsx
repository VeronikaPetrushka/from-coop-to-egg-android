import { useNavigation } from "@react-navigation/native"
import { button, card, facts, shared } from "../coopconstants/coopstyles"
import { settingsBtn, close } from "../coopconstants/images";
import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing, Dimensions } from "react-native";
import Chickensettings from "./Chickensettings";

const { height } = Dimensions.get('window');

const Chickenfactread = ({ eggFact }) => {
    const navigation = useNavigation();
    const [settingsOpen, setSettingsOpen] = useState(false);
        
    // Animation refs
    const settingsScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsRotateAnim = useRef(new Animated.Value(0)).current;
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const cardOpacityAnim = useRef(new Animated.Value(0)).current;
    const cardTranslateYAnim = useRef(new Animated.Value(20)).current;
    const imagePulseAnim = useRef(new Animated.Value(1)).current;
    const imageRotateAnim = useRef(new Animated.Value(0)).current;

    // Initialize animations
    useEffect(() => {
        // Card entrance animation
        Animated.parallel([
            Animated.spring(cardScaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 60,
                useNativeDriver: true,
            }),
            Animated.spring(cardTranslateYAnim, {
                toValue: 0,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacityAnim, {
                toValue: 1,
                duration: 600,
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

        // Image animations
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(imagePulseAnim, {
                        toValue: 1.05,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(imageRotateAnim, {
                        toValue: 0.05,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(imagePulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(imageRotateAnim, {
                        toValue: -0.05,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();

    }, []);

    const rotateInterpolate = settingsRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const rotateImageInterpolate = imageRotateAnim.interpolate({
        inputRange: [-0.05, 0, 0.05],
        outputRange: ['-3deg', '0deg', '3deg'],
    });

    return (
        <View style={shared.container}>
            <Animated.View 
                style={[
                    card.container, 
                    { 
                        width: '100%', 
                        height: '75%', 
                        justifyContent: 'space-between', 
                        padding: 20,
                        transform: [
                            { scale: cardScaleAnim },
                            { translateY: cardTranslateYAnim }
                        ],
                        opacity: cardOpacityAnim
                    }
                ]}
            >

                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Image source={close} style={button.closeBtn} />
                </TouchableOpacity>
                
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[card.chickenName, { fontSize: 28, lineHeight: 32, marginBottom: 20 }]}>
                        {eggFact.title}
                    </Text>
                    <Text style={[card.chickenText, { fontSize: 16, lineHeight: 22 }]}>
                        {eggFact.content}
                    </Text>
                </View>

                {eggFact.image && (
                    <Animated.Image
                        source={eggFact.image}
                        style={[
                            facts.image, 
                            { 
                                width: 150, 
                                height: 150,
                                resizeMode: 'contain',
                                marginTop: 20,
                                alignSelf: 'center',
                                transform: [
                                    { scale: imagePulseAnim },
                                    { rotate: rotateImageInterpolate }
                                ]
                            }
                        ]}
                    />
                )}
            </Animated.View>

            {/* Settings Button */}
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

export default Chickenfactread;