import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './src/screens/Main';
import SignIn from './src/screens/SignIn';
import Registration from './src/screens/Registration';
import Profile from './src/screens/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator(); 

export default function index() {
    const [api_token, setToken] = useEffect('');

    return (
    <>
    {
        api_token == '' ?
            (<NavigationContainer> 
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Signin" component={SignIn} />
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Registration" component={Registration} />
                </Stack.Navigator>
            </NavigationContainer> )
        :
            (<NavigationContainer>  
                <Tabs.Navigator>
                    <Tabs.Screen name="Profile" component={Profile} />
                </Tabs.Navigator>
            </NavigationContainer> )
    }
    </>
    )
}

