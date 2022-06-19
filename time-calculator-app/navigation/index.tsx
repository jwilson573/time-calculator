/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer, Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/types/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {PreviousEntries} from '../screens/PreviousEntries';
import NotFoundScreen from '../screens/NotFoundScreen';
import {TimeCalculator} from '../screens/TimeCalculator';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import {CustomTheme} from "../constants/types/Themes"

const CustomDefaultTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f6f6f6",
    border: "#ACACAC",
    text: "#232323",
    ctaButton: "#167aef",
    errorBorder: "#a21212",
    card: "#EEE"
  }
}

const CustomDarkTheme: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#1c1c1c",
    border: "#cecece",
    text: "#f1f1f1",
    ctaButton: "#0c3b73",
    errorBorder: "#a21212",
    card: "#494949"
  }
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Previous Entries" component={PreviousEntries} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const {colors} = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: colors?.primary,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TimeCalculator}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Time Calculator',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Previous Entries')
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="history"
                size={25}
                color={colors?.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

