import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import store from './src/store';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <MainNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
