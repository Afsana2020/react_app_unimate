import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { logout } from '../../lib/appwrite';

const LogoutTab = () => {
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/sign-in'); 
      Alert.alert('Success', 'You have been logged out.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text className="text-lg text-white mb-4">Are you sure you want to log out?</Text>
      <TouchableOpacity 
        onPress={handleLogout} 
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutTab;
