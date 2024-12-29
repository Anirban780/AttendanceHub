// _layout.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

const TabLayout = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name="home"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name="user"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
            

        </Tab.Navigator>

    );
};



export default TabLayout;
