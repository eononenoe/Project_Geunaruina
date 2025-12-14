import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import MonthlyFortuneScreen from '../screens/MonthlyFortuneScreen';
import SajuInputScreen from '../screens/SajuInputScreen';
import SajuResultScreen from '../screens/SajuResultScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="MonthlyFortune" component={MonthlyFortuneScreen} />
      <Stack.Screen name="SajuInput" component={SajuInputScreen} />
      <Stack.Screen name="SajuResult" component={SajuResultScreen} />
    </Stack.Navigator>
  );
}
