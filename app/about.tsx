import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Platform, TouchableOpacity } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline'

export default function ModalScreen() {
  const navigation = useNavigation()

  const closeModal = () => {
    navigation.goBack()
  }

  return (
      <View className="flex-1 items-center justify-center p-5">
        <TouchableOpacity className="absolute top-10 right-5" onPress={closeModal}>
          <XMarkIcon color="white" size={30} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Über die App</Text>
        <View className="my-8 h-px w-4/5 bg-gray-300 dark:bg-gray-700" />
        <Text className="text-lg text-center mb-5">
          Mit unserer App "Cinemy" kannst du Bewertungen und Rezensionen zu Filmen schreiben,
          Erinnerungen in Form von Selfies bewahren.
        </Text>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  )
}
