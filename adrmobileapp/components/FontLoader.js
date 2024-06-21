// FontLoader.js
import CrimsonPro from '../assets/fonts/CrimsonPro.ttf';
import Karla from '../assets/fonts/Karla.ttf';
import KarlaBold from '../assets/fonts/Karla-Bold.ttf';
import KarlaMedium from '../assets/fonts/Karla-Medium.ttf';
import Chillax from '../assets/fonts/Chillax.otf';
import MontserratSemiBold from '../assets/fonts/Montserrat-SemiBold.ttf';
import MontserratMedium from '../assets/fonts/Montserrat-Medium.ttf';
import MontserratBold from '../assets/fonts/Montserrat-Bold.ttf';
import GilroyExtraBold from '../assets/fonts/Gilroy-ExtraBold.otf';

// FontLoader.js
import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import * as Font from 'expo-font';

const FontLoader = ({children}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        CrimsonPro,
        Karla,
        KarlaBold,
        KarlaMedium,
        Chillax,
        MontserratSemiBold,
        MontserratMedium,
        MontserratBold,
        GilroyExtraBold,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>;
};

export default FontLoader;
