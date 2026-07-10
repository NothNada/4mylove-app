import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'NerdFont': require('./../../assets/fonts/0xProto/0xProtoNerdFont-Regular.ttf'),
  });

  useEffect(()=>{
    if(loaded || error){
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return <Stack />;
}
