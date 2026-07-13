import { useMemo, useState } from "react"
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { HeartsBackground } from "@/components/HeartsBackground"
import { galleryAssets } from "@/utils/galleryAssets"

const GAP = 8
const COLS = 2
const BORDERS = [14, 10, 18, 12, 20, 8, 16]

interface GridImage {
  id: number
  height: number
  borderRadius: number
}

function splitIntoColumns(
  images: { id: number; w: number; h: number }[],
  colWidth: number
): [GridImage[], GridImage[]] {
  const cols: [GridImage[], GridImage[]] = [[], []]
  const heights = [0, 0]

  images.forEach((img, i) => {
    const aspect = img.w / img.h
    const baseHeight = colWidth / aspect
    const multiplier = i % 3 === 0 ? 1.25 : 1
    const imgHeight = baseHeight * multiplier
    const borderRadius = BORDERS[i % BORDERS.length]
    const col = heights[0] <= heights[1] ? 0 : 1
    cols[col].push({ id: img.id, height: imgHeight, borderRadius })
    heights[col] += imgHeight + GAP
  })

  return cols
}

export default function Galeria() {
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  const COL_WIDTH = (SCREEN_WIDTH - GAP * (COLS + 1)) / COLS
  const columns = useMemo(() => splitIntoColumns(galleryAssets, COL_WIDTH), [COL_WIDTH])
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <View style={{ flex: 1, backgroundColor: "#151515" }}>
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: GAP, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={StyleSheet.absoluteFill} pointerEvents="none" className="opacity-60">
          <HeartsBackground />
        </View>

        <View style={{ paddingVertical: 60, alignItems: "center", zIndex: 1 }}>
          <Text style={{ color: "white", fontSize: 24 }}>
            {galleryAssets.length} fotos
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {columns[0].map((img, i) => (
              <View
                key={`c0-${i}`}
                style={{
                  height: img.height,
                  borderRadius: img.borderRadius,
                  marginBottom: GAP,
                  overflow: "hidden",
                }}
              >
                <Pressable onPress={() => setSelected(img.id)} style={{ flex: 1 }}>
                  <Image
                    source={img.id}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ width: GAP }} />

          <View style={{ flex: 1 }}>
            {columns[1].map((img, i) => (
              <View
                key={`c1-${i}`}
                style={{
                  height: img.height,
                  borderRadius: img.borderRadius,
                  marginBottom: GAP,
                  overflow: "hidden",
                }}
              >
                <Pressable onPress={() => setSelected(img.id)} style={{ flex: 1 }}>
                  <Image
                    source={img.id}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {selected !== null && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.96)", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
          <Pressable
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => setSelected(null)}
          >
            <Image
              source={selected}
              style={{ width: SCREEN_WIDTH, height: "100%" }}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            onPress={() => setSelected(null)}
            style={{ position: "absolute", top: 54, right: 20, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", justifyContent: "center", alignItems: "center", zIndex: 1000 }}
          >
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>✕</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}