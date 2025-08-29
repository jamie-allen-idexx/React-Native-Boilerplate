import { Stack } from 'expo-router';
import { Alert, Button, View } from 'react-native';

import { Welcome } from '@/templates/Welcome';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        title: 'Hackathon',
      }}
    />
    <View className="flex-1">
      <Welcome />
      <View className="p-4">
        <Button
          title="Click Me!"
          onPress={() =>
            Alert.alert('Button Pressed', 'Hello from the button!')
          }
        />
      </View>
    </View>
  </>
);

export default Home;
