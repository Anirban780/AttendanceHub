




import React from 'react';
import GlobalProvider from '../context/GlobalProvider';
import { Stack } from 'expo-router';

const App = () => {

    
  return (
    <GlobalProvider>
       <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        
      </Stack>
    </GlobalProvider>
     
  );
};

export default App;
