import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import detail from '../app/Detail';
import home from '../app/(tabs)/index';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Detail" options={{headerShown: false}} component={detail} />
                <Stack.Screen name="Home" options={{headerShown: false}} component={home} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}
