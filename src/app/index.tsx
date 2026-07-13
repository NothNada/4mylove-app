import { useCallback, useEffect, useRef, useState } from "react"
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated"
import LottieView from "lottie-react-native"
import { PhotoBackground } from "@/components/PhotoBackground"
import { HeartsBackground } from "@/components/HeartsBackground"
import { LoveMessage } from "@/components/LoveMessage"
import {
  calculateRelationshipTime,
  type RelationshipTime,
} from "@/utils/relationship"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

function plural(value: number, singular: string, pluralStr: string) {
  return `${value} ${value === 1 ? singular : pluralStr}`
}

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1, { duration: 120, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 120, easing: Easing.in(Easing.quad) }),
    )
  }, [value])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + scale.value * 0.06 }],
  }))

  return (
    <Animated.Text style={animStyle} className={className}>
      {String(value).padStart(2, "0")}
    </Animated.Text>
  )
}

function GlassCard({ children, metallic }: { children: React.ReactNode; metallic?: boolean }) {
  const card = (
    <View style={styles.cardInner}>
      <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} />
      {children}
    </View>
  )

  if (metallic) {
    return (
      <LinearGradient
        colors={["rgba(255,255,255,0.25)", "rgba(180,180,200,0.06)", "rgba(255,255,255,0.12)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.metallicBorder}
      >
        {card}
      </LinearGradient>
    )
  }

  return (
    <View style={styles.glassBorder}>
      {card}
    </View>
  )
}

function NextMilestone() {
  const time = calculateRelationshipTime()
  const days = time.nextMilestoneDays

  return (
    <View className="mx-4">
      <GlassCard>
        <View className="items-center px-6 py-5">
          <Text className="font-[Inter] text-[11px] tracking-[2px] text-white/30 uppercase mb-2">
            Próximo Marco
          </Text>
          <Text className="font-[Inter] font-bold text-2xl text-white/90">
            {time.nextMilestoneLabel} ♡
          </Text>
          {days > 0 && (
            <Text className="font-[Inter] text-sm text-white/40 mt-1">
              Faltam {plural(days, "dia", "dias")}
            </Text>
          )}
        </View>
      </GlassCard>
    </View>
  )
}

export default function Home() {
  const [time, setTime] = useState<RelationshipTime>(calculateRelationshipTime)
  const fireAnimation = useRef<LottieView>(null)
  const prevTotalDays = useRef(time.totalDays)

  const tick = useCallback(() => {
    const now = calculateRelationshipTime()
    setTime(now)
    if (now.totalDays > prevTotalDays.current && now.isMilestone) {
      fireAnimation.current?.play?.()
    }
    prevTotalDays.current = now.totalDays
  }, [])

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  return (
    <View className="flex-1">
      <PhotoBackground />
      <HeartsBackground />

      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pt-20 pb-6">
          <Text className="font-[Inter] font-light text-3xl text-white/80 tracking-wide">
            4 My Love
          </Text>
          <Text className="font-[Inter] text-sm text-white/25 tracking-[3px] uppercase mt-1">
            Para o amor da minha vida
          </Text>
        </View>

        {time.isMilestone && (
          <View className="mx-4 mb-6">
            <LinearGradient
              colors={["rgba(190,24,93,0.4)", "rgba(236,72,153,0.15)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl px-6 py-4 items-center"
            >
              <Text className="font-[Inter] font-bold text-lg text-white/90">
                ♡ Hoje completamos{" "}
                {time.milestoneType === "year"
                  ? plural(time.years, "ano", "anos")
                  : plural(
                      time.months === 0 && time.years > 0 ? 12 : time.months,
                      "mês",
                      "meses",
                    )}{" "}
                de amor! ♡
              </Text>
            </LinearGradient>
          </View>
        )}

        <View className="mx-4 mb-4">
          <GlassCard metallic>
            <View className="items-center px-4 py-10">
              <Text className="font-[Inter] text-[11px] tracking-[3px] text-white/30 uppercase mb-8">
                Tempo de Amor
              </Text>

              <View className="flex-row items-baseline mb-2">
                {time.years > 0 && (
                  <>
                    <View className="items-center">
                      <AnimatedNumber
                        value={time.years}
                        className="font-[Inter] font-bold text-6xl text-white"
                      />
                      <Text className="font-[Inter] text-xs tracking-[2px] text-white/35 mt-1 uppercase">
                        {plural(time.years, "ano", "anos")}
                      </Text>
                    </View>
                    <Text className="font-[Inter] font-bold text-6xl text-white/15 mx-4">
                      :
                    </Text>
                  </>
                )}
                <View className="items-center">
                  <AnimatedNumber
                    value={time.months || (time.years > 0 ? 0 : time.months)}
                    className="font-[Inter] font-bold text-6xl text-white"
                  />
                  <Text className="font-[Inter] text-xs tracking-[2px] text-white/35 mt-1 uppercase">
                    {plural(time.months, "mês", "meses")}
                  </Text>
                </View>
                <Text className="font-[Inter] font-bold text-6xl text-white/15 mx-4">
                  :
                </Text>
                <View className="items-center">
                  <AnimatedNumber
                    value={time.days}
                    className="font-[Inter] font-bold text-6xl text-white"
                  />
                  <Text className="font-[Inter] text-xs tracking-[2px] text-white/35 mt-1 uppercase">
                    {plural(time.days, "dia", "dias")}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-5 mt-8 pt-5 border-t border-white/5">
                <View className="items-center">
                  <Text className="font-[Inter] font-semibold text-xl text-white/70 tabular-nums">
                    {String(time.hours).padStart(2, "0")}
                  </Text>
                  <Text className="font-[Inter] text-[10px] tracking-[2px] text-white/25 uppercase mt-0.5">
                    horas
                  </Text>
                </View>
                <Text className="font-[Inter] font-semibold text-xl text-white/10">
                  :
                </Text>
                <View className="items-center">
                  <Text className="font-[Inter] font-semibold text-xl text-white/70 tabular-nums">
                    {String(time.minutes).padStart(2, "0")}
                  </Text>
                  <Text className="font-[Inter] text-[10px] tracking-[2px] text-white/25 uppercase mt-0.5">
                    min
                  </Text>
                </View>
                <Text className="font-[Inter] font-semibold text-xl text-white/10">
                  :
                </Text>
                <View className="items-center">
                  <Text className="font-[Inter] font-semibold text-xl text-white/70 tabular-nums">
                    {String(time.seconds).padStart(2, "0")}
                  </Text>
                  <Text className="font-[Inter] text-[10px] tracking-[2px] text-white/25 uppercase mt-0.5">
                    seg
                  </Text>
                </View>
              </View>

              <Text className="font-[Inter] text-xs text-white/20 mt-6">
                {time.totalDays} dias de puro amor
              </Text>
            </View>
          </GlassCard>
        </View>

        <View className="mx-4 mb-4">
          <GlassCard>
            <View className="items-center px-4 py-3">
              <LottieView
                ref={fireAnimation}
                autoPlay
                loop
                resizeMode="contain"
                style={{ width: SCREEN_WIDTH * 0.45, height: 60 }}
                source={require("./../../assets/animations/Fire.json")}
              />
            </View>
          </GlassCard>
        </View>

        <View className="mx-4 mb-4">
          <GlassCard>
            <LoveMessage />
          </GlassCard>
        </View>

        <NextMilestone />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  metallicBorder: {
    borderRadius: 24,
    padding: 1,
  },
  cardInner: {
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  glassBorder: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
})
