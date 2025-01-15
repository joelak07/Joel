import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Open',
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About',
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="Transactions"
        options={{
          title: 'Transactions',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
