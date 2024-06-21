import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import { RootStackParamList } from '../App';

type DonateProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function DonatePage(props: DonateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://alldistrictreads-bloom.kindful.com/embeds/eeeb8606-01e9-444b-b623-2e2a38729b69',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DonatePage;
