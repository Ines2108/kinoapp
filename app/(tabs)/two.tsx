import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-center my-10">Deine Favoriten</Text>
          <Text className="text-lg font-bold text-center my-5"> Hier findest du deine geherzten Kinofilme, welche du hier jederzeit bewerten oder entfernen kannst.</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="app/(tabs)/two.tsx" />
      </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
