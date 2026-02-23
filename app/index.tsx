import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Insert your logo image below. Replace require('../assets/images/logo.png') with your logo path */}
      <Image
        source={require("../assets/images/logo.png")} // <-- Place your logo here
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Trash Tracker</Text>
      <Text style={styles.subtitle}>Smart Waste Management</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11995D",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
});
