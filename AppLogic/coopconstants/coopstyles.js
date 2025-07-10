import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const font = 'ReggaeOne-Regular';

export const shared = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        paddingTop: height * 0.08,
        paddingHorizontal: 20
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});


export const card = StyleSheet.create({

    container: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 7,
        borderColor: '#F7A808',
        backgroundColor: '#923A00',
    },

    title: {
        fontFamily: font,
        color: '#FFBA00',
        textAlign: 'center',
        fontSize: 22,
        lineHeight: 24,
        marginBottom: 22
    },

    info: {
        fontFamily: font,
        color: '#FFBA00',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22,
    },

    banner: {
        width: '100%',
        height: height * 0.33,
        borderRadius: 15,
        resizeMode: 'cover'
    },

    chickenImg: {
        width: '29%',
        height: 143,
        resizeMode: 'contain'
    },

    chickenName: {
        fontFamily: font,
        color: '#FFBA00',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22,
    },

    chickenText: {
        fontFamily: font,
        color: '#FFBA00',
        fontSize: 12,
        lineHeight: 22,
    },

    eggIcon: {
        width: 20,
        height: 22,
        resizeMode: 'contain',
        marginRight: 3
    },

    meetIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginRight: 3
    },

    starIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginRight: 7
    },

    readIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginRight: 7
    },

});


export const button = StyleSheet.create({

    container: {
        width: 295,
        height: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        alignSelf: 'center'
    },

    text: {
        fontFamily: font,
        color: '#FFF15D',
        textAlign: 'center',
        fontSize: 40,
        zIndex: 12,
    },

    settingsBtn: {
        position: 'absolute',
        bottom: 70,
        right: 20
    },

    settings: {
        width: 83,
        height: 83,
        resizeMode: 'contain'
    },

    infoBtn: {
        width: '100%',
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C34E01'
    },

    closeBtn: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginBottom: 20
    },

    left: {
        width: 44,
        height: 44,
        resizeMode: 'contain'
    }

});

export const settings = StyleSheet.create({

    container: {
        height: height,
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontFamily: font,
        color: '#FFBA00',
        fontSize: 24,
    },

    offBtn: {
        width: 48,
        height: 48,
        resizeMode: 'contain'
    }

});

export const facts = StyleSheet.create({

    image: {
        width: '100%',
        height: height * 0.27,
        resizeMode: 'contain'
    }

});

export const game = StyleSheet.create({

    chicken: {
        width: 55,
        height: 72,
        resizeMode: 'contain'
    },

    egg: {
        width: 35,
        height: 61,
        resizeMode: 'contain'
    }

})