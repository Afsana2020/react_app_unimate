import { View, Text,Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router';

import { icons } from '../../constants';

const TabsIcon= ({icon,color,name,focused,fontSize}) => { 
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text 
            style={{ fontSize: fontSize, color: color }}
            className={`${focused ? 'font-psemibold' :'font-pregular'}`}
            >
                {name}
            </Text>
        </View>

    )
}

const TabsLayout= () => {
  return (
    <>
        <Tabs
           screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height:84,
                paddingTop: 20,
            }

           }}
        >
            <Tabs.Screen
            name="home"
            options={{
                tittle: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabsIcon 
                        icon={icons.home}
                        color={color}
                        name="Home"
                        focused={focused}
                        fontSize={8}
                    />
                )
            }}

            />

            <Tabs.Screen
            name="bookmark"
            options={{
                tittle: 'Bookmark',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabsIcon 
                        icon={icons.bookmark}
                        color={color}
                        name="Book mark"
                        focused={focused}
                        fontSize={8}
                    />
                )
            }}

            />

            <Tabs.Screen
            name="create"
            options={{
                tittle: 'create',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabsIcon 
                        icon={icons.plus}
                        color={color}
                        name="Create"
                        focused={focused}
                        fontSize={8}
                    />
                )
            }}

            />

            <Tabs.Screen
            name="profile"
            options={{
                tittle: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabsIcon 
                        icon={icons.profile}
                        color={color}
                        name="Profile"
                        focused={focused}
                        fontSize={9.5}
                    />
                )
            }}

            />

<Tabs.Screen
            name="logout"
            options={{
                tittle: 'Log out',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabsIcon 
                        icon={icons.logout}
                        color={color}
                        name="Log out"
                        focused={focused}
                        fontSize={8}
                    />
                )
            }}

        />

        </Tabs>
    </>
  )
}

export default TabsLayout