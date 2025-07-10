import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import cooploaderHTML from '../coopconstants/cooploader';
import { logo } from '../coopconstants/images';
import { shared } from '../coopconstants/coopstyles';

const ChickenLoader = () => {
    const navigation = useNavigation();
const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(translateYAnim, {
                    toValue: -15,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setTimeout(() => {
            navigation.navigate('Infoelement');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation, fadeAnim, translateYAnim]);

    return (
        <View style={shared.container}>

            <Animated.Image
                source={logo}
                style={{
                    width: '100%',
                    height: 180,
                    resizeMode: 'contain',
                    opacity: fadeAnim,
                    transform: [{ translateY: translateYAnim }],
                }}
            />
            
            <WebView
                originWhitelist={['*']}
                source={{ html: cooploaderHTML }}
                style={{
                    width: 200,
                    height: 60,
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 120,
                    backgroundColor: 'transparent',
                }}
                scrollEnabled={false}
            />
        </View>
    );
};

export default ChickenLoader;