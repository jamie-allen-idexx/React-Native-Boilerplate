import { Stack, router } from 'expo-router';
import { Button, View } from 'react-native';

import { Welcome } from '@/templates/Welcome';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: 'Home',
      }}
    />
    <View className="flex-1">
      <Welcome />
      <View className="p-4">
        <Button title="Connect" onPress={() => router.push('/chat')} />
      </View>
    </View>
  </>
);

export default Home;
