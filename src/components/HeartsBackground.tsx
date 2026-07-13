import { useEffect, useRef } from "react"
import { Animated, View, Dimensions, StyleSheet } from "react-native"

const { width: W, height: H } = Dimensions.get("window")

const hearts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 20 + Math.random() * 20,
  left: Math.random() * W,
  opacity: 0.2 + Math.random() * 0.3,
  duration: 8000 + Math.random() * 6000,
  delay: Math.random() * 8000,
  startY: -Math.random() * H,
}))

function FallingHeart({
  size,
  left,
  opacity,
  duration,
  delay,
  startY,
}: {
  size: number
  left: number
  opacity: number
  duration: number
  delay: number
  startY: number
}) {
  const translateY = useRef(new Animated.Value(startY)).current

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: H + 50,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -50,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      )
      loop.start()
      return () => loop.stop()
    }, delay)

    return () => clearTimeout(timeout)
  }, [translateY, duration, delay])

  return (
    <Animated.Text
      style={{
        position: "absolute",
        left,
        fontSize: size,
        opacity,
        transform: [{ translateY }],
      }}
    >
      ❤️
    </Animated.Text>
  )
}

export function HeartsBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={{ flex: 1 }}>
        {hearts.map((h) => (
          <FallingHeart key={h.id} {...h} />
        ))}
      </Animated.View>
    </View>
  )
}
