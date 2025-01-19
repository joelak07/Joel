import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Open', headerShown: false }} />
      <Stack.Screen name="home" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="Transactions" options={{ title: 'Transactions', headerShown: false }} />
      <Stack.Screen name="AddRecord" options={{ title: 'Add Record', headerShown: false }} />
      <Stack.Screen name="AddCategory" options={{ title: 'Add Category', headerShown: false }} />
    </Stack>
  );
}
