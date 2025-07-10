import React, { ReactNode } from "react";
import { View, ImageBackground, ImageSourcePropType } from "react-native";

interface ChickenBckgrndProps {
    image: ImageSourcePropType;
    element: ReactNode;
}

const ChickenBckgrnd: React.FC<ChickenBckgrndProps> = ({ image, element }) => {
    return (
        <ImageBackground source={image} style={{flex: 1}}>
            <View style={{flex: 1}}>
                {element}
            </View>
        </ImageBackground>
    );
};

export default ChickenBckgrnd;
