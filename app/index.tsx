import { router, Stack } from 'expo-router';
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
      <View className="gap-3 p-4">
        <Button title="Connect" onPress={() => router.push('/chat')} />
        <Button title="Annotate" onPress={() => router.push('/annotation')} />
      </View>
    </View>
  </>
);

export default Home;
