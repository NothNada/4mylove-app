import { ImageBackground, StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export function PhotoBackground() {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("./../../assets/images/background/1.jpeg")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.92)"]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#000",
  },
})
