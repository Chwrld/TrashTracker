import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const GREEN = "#11995D";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// ── Bottom Navbar ──────────────────────────────────────────────────────────────
const tabs = [
  { name: "Home", route: "/home", icon: "home", lib: "Ionicons" },
  {
    name: "Schedule",
    route: "/schedule",
    icon: "calendar-clock",
    lib: "Material",
  },
  { name: "Track", route: "/track", icon: "map-outline", lib: "Ionicons" },
  { name: "Alerts", route: "/alerts", icon: "share-variant", lib: "Material" },
  {
    name: "Profile",
    route: "/profile",
    icon: "person-circle-outline",
    lib: "Ionicons",
  },
];

function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            {tab.lib === "Ionicons" ? (
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={isActive ? GREEN : "#9E9E9E"}
              />
            ) : (
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color={isActive ? GREEN : "#9E9E9E"}
              />
            )}
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Animated GPS Dot (collector moving) ───────────────────────────────────────
function LiveMap() {
  // Simulate collector moving toward user location
  const collectorX = useRef(new Animated.Value(80)).current;
  const collectorY = useRef(new Animated.Value(120)).current;
  const pingScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate collector pin slowly drifting toward user
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(collectorX, {
            toValue: 130,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(collectorY, {
            toValue: 160,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(collectorX, {
            toValue: 80,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(collectorY, {
            toValue: 120,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();

    // Ping animation on user location
    Animated.loop(
      Animated.sequence([
        Animated.timing(pingScale, {
          toValue: 1.6,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pingScale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.mapArea}>
      {/* Fake map tile grid lines for realism */}
      <View style={styles.mapGrid} pointerEvents="none">
        {[...Array(6)].map((_, i) => (
          <View
            key={`h${i}`}
            style={[styles.gridLineH, { top: `${i * 20}%` as any }]}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <View
            key={`v${i}`}
            style={[styles.gridLineV, { left: `${i * 25}%` as any }]}
          />
        ))}
      </View>

      {/* Road-like lines */}
      <View style={styles.roadH} />
      <View style={styles.roadV} />

      {/* Collector pin (animated) */}
      <Animated.View
        style={[
          styles.collectorPin,
          {
            transform: [{ translateX: collectorX }, { translateY: collectorY }],
          },
        ]}
      >
        <Ionicons name="location-sharp" size={36} color={GREEN} />
      </Animated.View>

      {/* User location pin (fixed bottom-right area) */}
      <View style={styles.userPinWrapper}>
        {/* Ping ring */}
        <Animated.View
          style={[styles.pingRing, { transform: [{ scale: pingScale }] }]}
        />
        <Ionicons name="location-sharp" size={32} color="#4285F4" />
        {/* "Your Location" label */}
        <View style={styles.yourLocationLabel}>
          <Text style={styles.yourLocationText}>Your Location</Text>
        </View>
      </View>
    </View>
  );
}

// ── Track Screen ───────────────────────────────────────────────────────────────
export default function Track() {
  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>TrashTracker</Text>
        </View>
      </View>

      {/* ── ETA Box ── */}
      <View style={styles.etaBox}>
        <View style={styles.etaTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.etaLabel}>Estimated arrival</Text>
            <Text style={styles.etaTime}>8 minutes</Text>
          </View>
          <View style={styles.etaRight}>
            <View style={styles.onWayBadge}>
              <View style={styles.onWayDot} />
              <Text style={styles.onWayText}>On the Way</Text>
            </View>
            {/* Route letter badge */}
            <View style={styles.routeBadge}>
              <Text style={styles.routeBadgeText}>A</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Live Map (takes most of the screen) ── */}
      <LiveMap />

      {/* ── Collector Card (slides up over map) ── */}
      <View style={styles.collectorCard}>
        <View style={styles.collectorRow}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color="#bdbdbd" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.collectorSmallLabel}>
              Your Garbage Collector
            </Text>
            <Text style={styles.collectorName}>Marco Rodriguez</Text>
            <View style={styles.routeRow}>
              <MaterialCommunityIcons
                name="truck-fast"
                size={13}
                color={GREEN}
              />
              <Text style={styles.routeText}> Route A</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0.8</Text>
            <Text style={styles.statLabel}>km away</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>min ETA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>stops left</Text>
          </View>
        </View>
      </View>

      {/* ── Bottom Navbar ── */}
      <BottomNavbar />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f2ec" },

  // Header
  header: {
    backgroundColor: "#fff",
    paddingTop: 52,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandLogo: { width: 50, height: 50, borderRadius: 6 },
  brandText: { fontSize: 15, fontWeight: "700", color: GREEN },

  // ETA Box
  etaBox: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  etaTopRow: { flexDirection: "row", alignItems: "center" },
  etaLabel: { fontSize: 12, color: "#888", marginBottom: 2 },
  etaTime: { fontSize: 20, fontWeight: "800", color: "#1a1a1a" },
  etaRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  onWayBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e4f5ec",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  onWayDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  onWayText: { color: GREEN, fontWeight: "700", fontSize: 11 },
  routeBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  routeBadgeText: { fontWeight: "700", color: "#555", fontSize: 13 },

  // Map
  mapArea: {
    flex: 1,
    backgroundColor: "#ddeee5",
    position: "relative",
    overflow: "hidden",
  },
  mapGrid: { ...StyleSheet.absoluteFillObject },
  gridLineH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  roadH: {
    position: "absolute",
    top: "55%",
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 3,
  },
  roadV: {
    position: "absolute",
    left: "45%",
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 3,
  },

  // Collector pin (animated)
  collectorPin: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  // User pin
  userPinWrapper: {
    position: "absolute",
    bottom: 60,
    right: 70,
    alignItems: "center",
  },
  pingRing: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#4285F4",
    opacity: 0.4,
    top: -4,
  },
  yourLocationLabel: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  yourLocationText: { fontSize: 10, fontWeight: "600", color: "#333" },

  // Collector Card
  collectorCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 18,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  collectorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  collectorSmallLabel: { fontSize: 11, color: "#aaa", marginBottom: 2 },
  collectorName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  routeRow: { flexDirection: "row", alignItems: "center" },
  routeText: { fontSize: 12, color: GREEN, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginBottom: 14 },

  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 4,
  },
  statBox: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "800", color: GREEN },
  statLabel: { fontSize: 11, color: "#888", fontWeight: "600", marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: "#f0f0f0" },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 12,
    gap: 3,
  },
  navItemActive: { backgroundColor: "#e4f5ec" },
  navLabel: { fontSize: 10, color: "#9E9E9E", fontWeight: "500" },
  navLabelActive: { color: GREEN, fontWeight: "700" },
});
