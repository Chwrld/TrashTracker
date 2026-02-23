import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const GREEN = "#11995D";

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

// ── Profile Screen ─────────────────────────────────────────────────────────────
export default function Profile() {
  const router = useRouter();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* ── Header brand ── */}
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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── User Info ── */}
        <View style={styles.userSection}>
          {/* Avatar */}
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#bdbdbd" />
          </View>

          {/* Name + contact */}
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.infoRow}>
            <Ionicons
              name="mail-outline"
              size={13}
              color="#aaa"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.infoText}>john.doe@email.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="call-outline"
              size={13}
              color="#aaa"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.infoText}>09859378793</Text>
          </View>

          {/* Collection Area pill */}
          <View style={styles.collectionArea}>
            <Ionicons
              name="location-outline"
              size={16}
              color={GREEN}
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={styles.collectionAreaLabel}>
                Your Collection Area
              </Text>
              <Text style={styles.collectionAreaValue}>Route A – Downtown</Text>
            </View>
          </View>
        </View>

        {/* ── ACCOUNT Section ── */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.card}>
          {/* Edit Profile */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="person-outline" size={18} color={GREEN} />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* My Address */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="location-outline" size={18} color={GREEN} />
              </View>
              <View>
                <Text style={styles.menuText}>My Address</Text>
                <Text style={styles.menuSubText}>
                  Matina Aplaya, Davao City
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* ── PREFERENCES Section ── */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.card}>
          {/* Notifications toggle */}
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={GREEN}
                />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: "#e0e0e0", true: GREEN }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuDivider} />

          {/* Dark Mode toggle */}
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconCircle}>
                <Ionicons name="moon-outline" size={18} color={GREEN} />
              </View>
              <Text style={styles.menuText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeOn}
              onValueChange={setDarkModeOn}
              trackColor={{ false: "#e0e0e0", true: GREEN }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ── Logout Button ── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App name footer */}
        <Text style={styles.footerBrand}>TrashTracker</Text>
      </ScrollView>

      {/* ── Bottom Navbar ── */}
      <BottomNavbar />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

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
  brandLogo: { width: 26, height: 26, borderRadius: 6 },
  brandText: { fontSize: 15, fontWeight: "700", color: GREEN },

  // User Section
  userSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: { fontSize: 13, color: "#888" },

  // Collection Area pill
  collectionArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf6f1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    width: "100%",
  },
  collectionAreaLabel: { fontSize: 11, color: "#888", marginBottom: 2 },
  collectionAreaValue: { fontSize: 14, fontWeight: "700", color: "#1a1a1a" },

  // Section labels
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 20,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  // Menu items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eaf6f1",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },
  menuSubText: { fontSize: 12, color: "#aaa", marginTop: 2 },
  menuDivider: { height: 1, backgroundColor: "#f5f5f5" },

  // Logout
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 28,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoutText: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },

  // Footer brand
  footerBrand: {
    textAlign: "center",
    fontSize: 12,
    color: "#ccc",
    marginTop: 16,
    fontWeight: "600",
  },

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
