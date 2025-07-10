import React, { JSX, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Loaderelement,
    Infoelement,
    Menuelement,
    Breedselement,
    BreedInfoelement,
    Favouriteselement,
    EggsFactselement,
    FactReadelement,
    MiniGameelement
} from './AppLogic/coopconstants/chickenelements';
import { initializeMusic } from './AppLogic/coopconstants/sound';

export type RootStackParamList = {
    Loaderelement: undefined;
    Infoelement: undefined;
    Menuelement: undefined;
    Breedselement: undefined;
    BreedInfoelement: undefined;
    Favouriteselement: undefined;
    EggsFactselement: undefined;
    FactReadelement: undefined;
    MiniGameelement: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  useEffect(() => {
        initializeMusic();
  }, []);

  return (
      <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Loaderelement"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Loaderelement"
                    component={Loaderelement}
                />
                <Stack.Screen
                    name="Infoelement"
                    component={Infoelement}
                />
                <Stack.Screen
                    name="Menuelement"
                    component={Menuelement}
                />
                <Stack.Screen
                    name="Breedselement"
                    component={Breedselement}
                />
                <Stack.Screen
                    name="BreedInfoelement"
                    component={BreedInfoelement}
                />
                <Stack.Screen
                    name="Favouriteselement"
                    component={Favouriteselement}
                />
                <Stack.Screen
                    name="EggsFactselement"
                    component={EggsFactselement}
                />
                <Stack.Screen
                    name="FactReadelement"
                    component={FactReadelement}
                />
                <Stack.Screen
                    name="MiniGameelement"
                    component={MiniGameelement}
                />
            </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
