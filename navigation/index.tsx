/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ScheduleMainScreen from '../screens/ScheduleMainScreen';
import DashboardScreen from '../screens/DashboardScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ScheduleFeedbackScreen from "../screens/ScheduleFeedbackScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Colors from "../constants/Colors";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
            <Stack.Screen name='SchedulePage' component={SchedulePageNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Root" component={TopTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
    return (
        <Tab.Navigator
            style={{paddingTop: 30, backgroundColor: Colors.v2.background}}
            screenOptions={{
                tabBarStyle: {
                    alignSelf: "center",
                    width: '70%',
                    borderRadius: 100,
                    shadowOpacity: 0,
                    shadowRadius: 0,
                },
                tabBarIndicatorStyle: {
                    alignSelf: "center",
                    width: '38%',
                    top: 12,
                    marginLeft: 15,
                    height: 25,
                    borderRadius: 100,
                    backgroundColor: Colors.v2.primary,
                },
                tabBarLabelStyle: {
                    fontWeight: "bold",
                },
                tabBarActiveTintColor: Colors.v2.background,
                tabBarInactiveTintColor: Colors.v2.secondary,
            }}
        >
            <Tab.Screen name="Schedule" component={ScheduleMainScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
        </Tab.Navigator>
    );
}

const SchedulePage = createNativeStackNavigator();

function SchedulePageNavigator() {
    return (
      <SchedulePage.Navigator screenOptions={{
          headerTitle: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false}}>
          <SchedulePage.Screen name='Main' component={TopTabNavigator} options={{headerShown: false}}/>
          <SchedulePage.Screen name='Feedback' component={ScheduleFeedbackScreen}/>
      </SchedulePage.Navigator>
    );
}
