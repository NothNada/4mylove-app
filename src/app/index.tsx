import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>

      <Text style={{ fontFamily: 'NerdFont' }}>Edit src/app/index.tsx to edit</Text>


      <Image source={require('./../../assets/images/icon-dark.png')} style={{ width: 100, height: 100 }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
