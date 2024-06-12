import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold text-center my-5">Herzlich Willkommen bei unserer Kinoapp!</Text>
      <Text className="text-lg font-bold text-center my-10"> Hier findest du die neuesten Kinofilme, welche du jederzeit herzen und bewerten kannst. Du findest deine Filme unter "Favoriten".</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
