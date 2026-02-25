import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const GREEN = "#11995D";

export default function CollectorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    router.replace("/CollectorMain"); // navigate to collector dashboard
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* ── Back to resident login ── */}
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => router.replace("/")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back-circle-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.backText}>Back to resident login</Text>
          </TouchableOpacity>

          {/* ── Brand ── */}
          <View style={styles.brandRow}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandName}>Trash Tracker</Text>
              <Text style={styles.brandSub}>Smart Waste Management</Text>
            </View>
          </View>

          {/* ── Welcome text ── */}
          <Text style={styles.welcomeTitle}>Welcome back</Text>
          <Text style={styles.welcomeSub}>
            Sign in to manage routes and update{"\n"}collection status
          </Text>

          {/* ── Form ── */}
          <View style={styles.form}>
            {/* Email */}
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor="#ccc"
            />

            {/* Password */}
            <Text style={styles.inputLabel}>Password:</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                placeholder=""
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>

            {/* Sign In button */}
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },

  // Back link
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 28,
  },
  backText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },

  // Brand
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  brandLogo: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  brandSub: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  // Welcome
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  welcomeSub: {
    fontSize: 13,
    color: "#888",
    lineHeight: 20,
    marginBottom: 32,
  },

  // Form
  form: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1a1a1a",
    marginBottom: 20,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    height: 50,
    marginBottom: 28,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1a1a1a",
  },
  eyeBtn: {
    paddingHorizontal: 14,
  },

  // Sign In button
  signInBtn: {
    backgroundColor: GREEN,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
