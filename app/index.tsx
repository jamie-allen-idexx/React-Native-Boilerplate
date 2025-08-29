import { Stack, useRouter } from 'expo-router';
import { Button, View } from 'react-native';

import { Welcome } from '@/templates/Welcome';

const Home = () => {
  const router = useRouter();

  const handleConnect = () => {
    router.push('/chat');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Hackathon',
        }}
      />
      <View className="flex-1">
        <Welcome />
        <View className="p-4">
          <Button title="Connect" onPress={handleConnect} />
        </View>
      </View>
    </>
  );
};

export default Home;
