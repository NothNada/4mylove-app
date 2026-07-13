import "@/global.css"
import { SplashScreen } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"

import { NativeTabs } from "expo-router/unstable-native-tabs"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("./../../assets/fonts/Inter/Inter-Variable.ttf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <NativeTabs
      backgroundColor="#121212"
      tintColor="#fff"
      indicatorColor="#EC4899"
      labelStyle={{
        default: { fontFamily: "Inter", fontSize: 12, color: "rgba(255,255,255,0.35)" },
        selected: { fontFamily: "Inter", fontSize: 12, color: "#EC4899", fontWeight: "600" },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="galeria" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Memórias</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="photo_library" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
