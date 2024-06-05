// FontLoader.js
import CrimsonPro from '../assets/fonts/CrimsonPro.ttf';
import Karla from '../assets/fonts/Karla.ttf';
import KarlaBold from '../assets/fonts/Karla-Bold.ttf';
import KarlaMedium from '../assets/fonts/Karla-Medium.ttf';

// FontLoader.js
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        CrimsonPro,
        Karla,
        KarlaBold,
        KarlaMedium,
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

