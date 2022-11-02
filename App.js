/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomTabBar from './components/customBar/customBar';
import Tabbar from './components/Tabbar';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.container}>
        <CustomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ea3345',
    justifyContent: 'flex-end',
  },
});

export default App;
