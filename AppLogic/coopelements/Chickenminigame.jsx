import { button, card, game, shared } from "../coopconstants/coopstyles";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, Animated, Easing, ScrollView, Dimensions } from "react-native";
import { buttonBtn, backBtn, settingsBtn, chickenGame, orangeGame, whiteGame, greenGame, crackGame, leftBtn, rightBtn } from "../coopconstants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Chickensettings from "./Chickensettings";
import { useState, useEffect, useRef } from "react";
import Video from 'react-native-video';

const Chickenminigame = () => {
    const navigation = useNavigation();
    const [miniGame, setMiniGame] = useState(false);
    const [endMiniGame, setEndMiniGame] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [currentGameScore, setCurrentGameScore] = useState(0);
    const [bestGameScore, setBestGameScore] = useState(0);

    const settingsScaleAnim = useRef(new Animated.Value(1)).current;
    const settingsRotateAnim = useRef(new Animated.Value(0)).current;
    const backScaleAnim = useRef(new Animated.Value(1)).current;

    const { width, height } = Dimensions.get('window');
    const [chickenPosition, setChickenPosition] = useState(width / 2 - 38.5);
    const [eggs, setEggs] = useState([]);
    const [gameSpeed, setGameSpeed] = useState(1);
    const gameLoopRef = useRef(null);
    const eggIntervalRef = useRef(null);
    const collisionDetectedRef = useRef(false);

    const chickenPositionRef = useRef(width / 2 - 38.5);
    const currentGameScoreRef = useRef(0);
    const bestGameScoreRef = useRef(0);

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

        return () => {
            if (eggIntervalRef.current) clearInterval(eggIntervalRef.current);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, []);

    const rotateInterpolate = settingsRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        const loadBestScore = async () => {
            try {
                const bestScore = await AsyncStorage.getItem('MINI_GAME_BEST_SCORE');
                if (bestScore !== null) {
                    const best = parseInt(bestScore, 10);
                    setBestGameScore(best);
                    bestGameScoreRef.current = best;
                }
            } catch (error) {
                console.error('Error loading best score:', error);
            }
        };
        loadBestScore();
    }, []);

    useEffect(() => {
        chickenPositionRef.current = chickenPosition;
    }, [chickenPosition]);
    
    useEffect(() => {
        currentGameScoreRef.current = currentGameScore;
        
        if (currentGameScore > bestGameScoreRef.current) {
            const newBest = currentGameScore;
            setBestGameScore(newBest);
            bestGameScoreRef.current = newBest;
            
            AsyncStorage.setItem('MINI_GAME_BEST_SCORE', newBest.toString())
                .catch(error => console.error('Error saving best score:', error));
        }
    }, [currentGameScore]);

    const moveLeft = () => {
        const newPosition = Math.max(0, chickenPosition - 30);
        setChickenPosition(newPosition);
        chickenPositionRef.current = newPosition;
    };

    const moveRight = () => {
        const newPosition = Math.min(width - 110, chickenPosition + 30);
        setChickenPosition(newPosition);
        chickenPositionRef.current = newPosition;
    };

    const generateEgg = () => {
        const weights = [0.2, 0.5, 0.2, 0.1];
        const random = Math.random();
        let type = 'white';
        
        if (random < weights[0]) type = 'orange';
        else if (random < weights[0] + weights[1]) type = 'white';
        else if (random < weights[0] + weights[1] + weights[2]) type = 'green';
        else type = 'crack';

        return {
            type,
            column: Math.floor(Math.random() * 4),
            position: 0,
            id: Date.now() + Math.random()
        };
    };

    const startMiniGame = () => {
        setMiniGame(true);
        setEndMiniGame(false);
        setCurrentGameScore(0);
        currentGameScoreRef.current = 0;
        setGameSpeed(1);
        
        const centerPosition = width / 2 - 38.5;
        setChickenPosition(centerPosition);
        chickenPositionRef.current = centerPosition;
        
        setEggs([]);
        collisionDetectedRef.current = false;
        
        eggIntervalRef.current = setInterval(() => {
            setEggs(prev => [...prev, generateEgg()]);
        }, 1000);
        
        gameLoopRef.current = setInterval(gameLoop, 16);
    };

    const gameLoop = () => {
        setEggs(prevEggs => {
            const newEggs = prevEggs.filter(egg => {
                const isCaught = (
                    egg.position + 73 >= height - 120 &&
                    egg.position < height - 50 &&
                    Math.abs(chickenPositionRef.current - (egg.column * (width / 4))) < 80
                );

                if (isCaught && !collisionDetectedRef.current) {
                    collisionDetectedRef.current = true;
                    let scoreChange = 0;
                    
                    switch (egg.type) {
                        case 'orange': scoreChange = 2; break;
                        case 'white': scoreChange = 1; break;
                        case 'green': scoreChange = -1; break;
                        case 'crack': scoreChange = -2; break;
                    }

                    const newScore = currentGameScoreRef.current + scoreChange;
                    
                    if (newScore < 0) {
                        endGame();
                        return false;
                    }

                    setCurrentGameScore(newScore);
                    
                    if (newScore > 0 && newScore % 10 === 0) {
                        setGameSpeed(1 + Math.floor(newScore / 10) * 0.2);
                    }

                    return false;
                }

                if (egg.position > height) {
                    return false;
                }

                return true;
            }).map(egg => ({
                ...egg,
                position: egg.position + 3 * gameSpeed
            }));

            collisionDetectedRef.current = false;
            return newEggs;
        });
    };

    const endGame = async () => {
        clearInterval(eggIntervalRef.current);
        clearInterval(gameLoopRef.current);
        setMiniGame(false);
        setEndMiniGame(true);
        
        try {
            const records = await AsyncStorage.getItem('MINI_GAME_RECORDS');
            let updatedRecords = records ? JSON.parse(records) : [];
            
            if (currentGameScore > 0) {
                updatedRecords.push(currentGameScore);
                await AsyncStorage.setItem('MINI_GAME_RECORDS', JSON.stringify(updatedRecords));
            }
        } catch (error) {
            console.error('Error saving game records:', error);
        }
    };

    const restartMiniGame = () => {
        startMiniGame();
    };

    return (
        <View style={shared.container}>
            {(!miniGame && !endMiniGame) && (
                <View style={{ width: '100%', flexGrow: 1, justifyContent: 'space-between' }}>
                    <View style={[card.container, { height: '77%', alignItems: 'center' }]}>
                        <ScrollView
                            style={{ width: '100%' }}
                            contentContainerStyle={{ alignItems: 'center', paddingTop: 40, paddingHorizontal: 10 }}
                        >
                            <Text style={[card.chickenName, {fontSize: 24, lineHeight: 28, marginBottom: 12}]}>Clucky Catch</Text>
                            <Text style={[card.chickenName, {lineHeight: 24, marginBottom: 5}]}>🥚 Game Rules</Text>
                            <Text style={card.chickenName}>{'\u25B8'} Move the chicken left or right using the arrow keys.</Text>
                            <Image source={chickenGame} style={[game.chicken, {marginBottom: 5}]} />
                            <Text style={[card.chickenName, {marginBottom: 5}]}>{'\u25B8'} Catch the good eggs!</Text>
                            <View style={[shared.row, {width: '100%'}]}>
                                <View style={{width: '50%', alignItems: 'center'}}>
                                    <Text style={card.chickenName}>+2 points</Text>
                                    <Image source={orangeGame} style={game.egg} />
                                </View>
                                <View style={{width: '50%', alignItems: 'center'}}>
                                    <Text style={card.chickenName}>+1 points</Text>
                                    <Image source={whiteGame} style={game.egg} />
                                </View>
                            </View>
                            <Text style={card.chickenName}>{'\u25B8'} Avoid the bad eggs!</Text>
                            <View style={[shared.row, {justifyContent: 'space-between', width: '100%'}]}>
                                <View style={{width: '50%', alignItems: 'center'}}>
                                    <Image source={greenGame} style={game.egg} />
                                </View>
                                <View style={{width: '50%', alignItems: 'center'}}>
                                    <Image source={crackGame} style={game.egg} />
                                </View>
                            </View>
                            <Text style={card.chickenName}>{'\u25B8'} Every 10 points, the eggs fall faster!</Text>
                            <Text style={card.chickenName}>{'\u25B8'} At the end, see your score and your best record!</Text>

                            <TouchableOpacity
                                style={[button.container, {width: 160, height: 72, marginTop: 20}]}
                                onPress={startMiniGame}
                            >
                                <Image source={buttonBtn} style={button.image} />
                                <Text style={[button.text, {fontSize: 26}]}>Start</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            )}

            {(miniGame && !endMiniGame) && (
                <View style={{ width: '100%', flexGrow: 1 }}>
                    <View style={[shared.row, { justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }]}>
                        <Text style={card.title}>Score: {currentGameScore}</Text>
                        <Text style={card.title}>Best: {bestGameScore}</Text>
                    </View>

                    {/* Game Area */}
                    <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                        {/* Chicken (player) */}
                        <Animated.View
                            style={{
                                position: 'absolute',
                                bottom: 90,
                                left: chickenPosition,
                                zIndex: 10
                            }}
                        >
                            <Image source={chickenGame} style={{ width: 77, height: 101, resizeMode: 'contain' }} />
                        </Animated.View>

                        {/* Falling Eggs */}
                        {eggs.map((egg) => (
                            <Animated.View
                                key={egg.id}
                                style={{
                                    position: 'absolute',
                                    top: egg.position,
                                    left: egg.column * (width / 4),
                                    width: 52,
                                    height: 73,
                                    zIndex: 5
                                }}
                            >
                                <Image 
                                    source={
                                        egg.type === 'orange' ? orangeGame :
                                        egg.type === 'white' ? whiteGame :
                                        egg.type === 'green' ? greenGame : crackGame
                                    } 
                                    style={{ width: 52, height: 73, resizeMode: 'contain' }} 
                                />
                            </Animated.View>
                        ))}
                    </View>

                    {/* Controls */}
                    <View style={[shared.row, { justifyContent: 'center', marginTop: 20 }]}>
                        <TouchableOpacity
                            style={[button.container, { width: 80, marginRight: 20 }]}
                            onPress={moveLeft}
                        >
                            <Image source={leftBtn} style={button.left} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[button.container, { width: 80 }]}
                            onPress={moveRight}
                        >
                            <Image source={rightBtn} style={button.left} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {(!miniGame && endMiniGame) && (
                <View style={[card.container, {height: '60%', justifyContent: 'space-around', alignItems: 'center'}]}>
                    <Text style={[card.chickenName, { fontSize: 24, lineHeight: 28, marginBottom: 12 }]}>Game Over</Text>
                    <Text style={[card.title, { marginBottom: 10 }]}>Best Score: {bestGameScore}</Text>
                    <Video
                        source={require('../coopassets/cooanimations/game-chicken.mp4')}
                        style={{ width: 250, height: 250, borderRadius: 20, overflow: 'hidden' }}
                        resizeMode="contain"
                        repeat
                        muted
                        paused={false}
                    />
                    <TouchableOpacity
                        style={[button.container, {width: 160, height: 72}]}
                        onPress={restartMiniGame}
                    >
                        <Image source={buttonBtn} style={button.image} />
                        <Text style={[button.text, {fontSize: 26}]}>Restart</Text>
                    </TouchableOpacity>
                </View>
            )}

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

export default Chickenminigame;