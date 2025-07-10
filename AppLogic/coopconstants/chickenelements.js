import { backGame, backLoader, backMain } from "./images";

import ChickenBckgrnd from "../coopshrd/ChickenBckgrnd";

import ChickenLoader from "../coopelements/Chickenloader";
import ChickenInfo from "../coopelements/Chickeninfo";
import Chickenmenu from "../coopelements/Chickenmenu";
import Chickenbreeds from "../coopelements/Chickenbreeds";
import Chickenbreedinfo from "../coopelements/Chickenbreedinfo";
import Chickenfavourites from "../coopelements/Chickenfavourites";
import Chickeneggfacts from "../coopelements/Chickeneggfacts";
import Chickenfactread from "../coopelements/Chickenfactread";
import Chickenminigame from "../coopelements/Chickenminigame";

export const Loaderelement = () => {
    return (
        <ChickenBckgrnd
            image={backLoader}
            element={<ChickenLoader />}
        />
    )
};

export const Infoelement = () => {
    return (
        <ChickenBckgrnd
            image={backMain}
            element={<ChickenInfo />}
        />
    )
};

export const Menuelement = () => {
    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickenmenu />}
        />
    )
};

export const Breedselement = () => {
    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickenbreeds />}
        />
    )
};

export const BreedInfoelement = ({ route }) => {
    const { chicken } = route.params;

    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickenbreedinfo chicken={chicken} />}
        />
    )
};

export const Favouriteselement = () => {
    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickenfavourites />}
        />
    )
};

export const EggsFactselement = () => {
    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickeneggfacts />}
        />
    )
};

export const FactReadelement = ({ route }) => {
    const { eggFact } = route.params;

    return (
        <ChickenBckgrnd
            image={backMain}
            element={<Chickenfactread eggFact={eggFact} />}
        />
    )
};

export const MiniGameelement = () => {
    return (
        <ChickenBckgrnd
            image={backGame}
            element={<Chickenminigame />}
        />
    )
};