import { useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { HeartsBackground } from "@/components/HeartsBackground";

export default function Index() {
  const fireAnimation = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <HeartsBackground />

      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <View style={styles.glass}>
          <View style={styles.glassBorder}/>
          <Text style={styles.title}>6 Meses</Text>

          <View style={styles.lottieBox}>
            <LottieView
              autoPlay
              loop
              resizeMode="contain"
              ref={fireAnimation}
              style={{ width: "100%", height: "100%" }}
              source={require("./../../assets/animations/Fire.json")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    flexDirection: 'column',
    top: 100
  },
  glass: {
    flexDirection: 'row',
    width: "100%",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  glassBorder: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  title: {
    fontFamily: "NerdFont",
    color: "#fff",
    fontSize: 30,
    left: 50,
  },
  lottieBox: {
    width: 120,
    height: 60,
    bottom: 10
  },
});
