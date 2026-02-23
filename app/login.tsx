import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ImageBackground,
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

export default function Login() {
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/home");
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
        {/* ── Top green hero section with background image ── */}
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={styles.hero}
          imageStyle={styles.heroBgImage}
        >
          {/* Dark green overlay so text stays readable */}
          <View style={styles.heroOverlay} />

          {/* Brand row */}
          <View style={styles.brandRow}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandName}>Trash Tracker</Text>
              <Text style={styles.brandSub}>Smart Waste Management</Text>
            </View>
          </View>

          {/* Hero headline */}
          <Text style={styles.heroTitle}>
            Track Your garbage{"\n"}collection in real-time
          </Text>
          <Text style={styles.heroDesc}>
            Know exactly when your waste will be collected{"\n"}and whos coming
          </Text>
        </ImageBackground>

        {/* ── White card ── */}
        <View style={styles.card}>
          {/* Phone / Email toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                mode === "phone" && styles.toggleActive,
              ]}
              onPress={() => setMode("phone")}
              activeOpacity={0.8}
            >
              <Text style={styles.toggleIcon}>📞</Text>
              <Text
                style={[
                  styles.toggleText,
                  mode === "phone" && styles.toggleTextActive,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                mode === "email" && styles.toggleActive,
              ]}
              onPress={() => setMode("email")}
              activeOpacity={0.8}
            >
              <Text style={styles.toggleIcon}>✉️</Text>
              <Text
                style={[
                  styles.toggleText,
                  mode === "email" && styles.toggleTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input label */}
          <Text style={styles.inputLabel}>
            {mode === "phone" ? "Phone Number:" : "Email Address:"}
          </Text>

          {/* Input field */}
          <TextInput
            style={styles.input}
            keyboardType={mode === "phone" ? "phone-pad" : "email-address"}
            value={mode === "phone" ? phone : email}
            onChangeText={mode === "phone" ? setPhone : setEmail}
            autoCapitalize="none"
            placeholder=""
          />

          {/* Continue button */}
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {"\n"}and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>
              Are you a garbage keeper?{" "}
              <Text style={styles.footerLink}>Login here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Hero
  hero: {
    backgroundColor: GREEN,
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  heroBgImage: {
    opacity: 0.22, // faint background image visible behind green
    resizeMode: "cover",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GREEN,
    opacity: 0.48,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 36,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  brandName: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  brandSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
    marginBottom: 12,
    zIndex: 1,
  },
  heroDesc: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 20,
    zIndex: 1,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    flex: 1,
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  toggleActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleIcon: {
    fontSize: 14,
  },
  toggleText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#111",
    fontWeight: "700",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  continueBtn: {
    backgroundColor: GREEN,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  continueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  termsText: {
    textAlign: "center",
    fontSize: 11,
    color: "#aaa",
    lineHeight: 18,
  },
  termsLink: {
    color: GREEN,
    fontWeight: "600",
  },

  // Footer
  footer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#666",
  },
  footerLink: {
    color: GREEN,
    fontWeight: "700",
  },
});
