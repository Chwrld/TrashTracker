import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 8 }]}>
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
                color={isActive ? "#11995D" : "#9E9E9E"}
              />
            ) : (
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color={isActive ? "#11995D" : "#9E9E9E"}
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

// ── Progress Step ──────────────────────────────────────────────────────────────
function ProgressStep({
  icon,
  label,
  sublabel,
  active,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  active: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <View style={{ alignItems: "center", marginRight: 14 }}>
        <View
          style={[
            styles.progressCircle,
            active
              ? styles.progressCircleActive
              : styles.progressCircleInactive,
          ]}
        >
          {icon}
        </View>
        {!isLast && <View style={styles.progressConnector} />}
      </View>
      <View style={{ paddingTop: 6, paddingBottom: isLast ? 0 : 20 }}>
        <Text
          style={[styles.progressLabel, active && styles.progressLabelActive]}
        >
          {label}
        </Text>
        {sublabel ? (
          <Text style={styles.progressSublabel}>{sublabel}</Text>
        ) : null}
      </View>
    </View>
  );
}

// ── Home Screen ────────────────────────────────────────────────────────────────
export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerBrand}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={styles.headerBrandText}>TrashTracker</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications" size={18} color="#11995D" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subGreeting}>Your collection is on the way</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Collector Card ── */}
        <View style={styles.collectorCard}>
          <Text style={styles.collectorTopLabel}>Your Garbage Collector</Text>
          <View style={styles.collectorRow}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={32} color="#bdbdbd" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.collectorName}>Marco Rodriguez</Text>
              <View style={styles.onTheWayBadge}>
                <View style={styles.onTheWayDot} />
                <Text style={styles.onTheWayText}>On the Way</Text>
              </View>
            </View>
          </View>
          <View style={styles.collectorActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="call-outline" size={15} color="#11995D" />
              <Text style={styles.actionText}>09845354876</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="person-outline" size={15} color="#11995D" />
              <Text style={styles.actionText}>Paula A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Collection Progress ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Collection Progress</Text>
          <ProgressStep
            icon={<Ionicons name="calendar" size={16} color="#fff" />}
            label="Scheduled"
            active={true}
          />
          <ProgressStep
            icon={
              <MaterialCommunityIcons
                name="truck-fast"
                size={16}
                color="#fff"
              />
            }
            label="On the Way"
            sublabel="In Progress"
            active={true}
          />
          <ProgressStep
            icon={<Ionicons name="trash" size={16} color="#fff" />}
            label="Collecting"
            active={false}
          />
          <ProgressStep
            icon={<Ionicons name="checkmark-done" size={16} color="#fff" />}
            label="Completed"
            active={false}
            isLast
          />
        </View>

        {/* ── Live Tracking ── */}
        <View style={styles.card}>
          <View style={styles.cardRowHeader}>
            <Ionicons name="location-sharp" size={15} color="#11995D" />
            <Text
              style={[styles.cardTitle, { marginBottom: 0, marginLeft: 5 }]}
            >
              Live Tracking
            </Text>
          </View>
          <View style={styles.mapBox}>
            <Ionicons
              name="location-sharp"
              size={30}
              color="#11995D"
              style={{ position: "absolute", left: "28%", top: 16 }}
            />
            <Ionicons
              name="location-sharp"
              size={30}
              color="#4285F4"
              style={{ position: "absolute", right: "22%", top: 16 }}
            />
            <View style={styles.etaRow}>
              <Text style={styles.etaLabel}>Estimated Arrival</Text>
              <Text style={styles.etaValue}>8 mins</Text>
            </View>
          </View>
        </View>

        {/* ── Today's Schedule ── */}
        <View style={styles.card}>
          <View style={styles.cardRowSpaced}>
            <Text style={styles.cardTitle}>Todays Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All &gt;</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.todayBadge}>
            <Text style={styles.todayBadgeText}>Today</Text>
          </View>
          <View style={[styles.scheduleItem, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.scheduleDate}>Today, Jan 15</Text>
              <Text style={styles.scheduleTime}>9:00 AM – 10:00 AM</Text>
              <View style={styles.scheduleLocRow}>
                <Ionicons name="location-outline" size={11} color="#888" />
                <Text style={styles.scheduleLoc}>
                  {" "}
                  Malinao Aplaya, Davao City
                </Text>
              </View>
            </View>
            <View style={styles.onTheWaySmallBadge}>
              <Text style={styles.onTheWaySmallText}>On the Way</Text>
            </View>
          </View>
        </View>

        {/* ── Upcoming ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming</Text>
          <View style={styles.scheduleItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.scheduleDate}>Today, Jan 15</Text>
              <Text style={styles.scheduleTime}>9:00 AM – 10:00 AM</Text>
              <View style={styles.scheduleLocRow}>
                <Ionicons name="location-outline" size={11} color="#888" />
                <Text style={styles.scheduleLoc}>
                  {" "}
                  Malinao Aplaya, Davao City
                </Text>
              </View>
            </View>
            <View style={styles.notStartedBadge}>
              <Text style={styles.notStartedText}>Not Started</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom Navbar ── */}
      <BottomNavbar />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const GREEN = "#11995D";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f5" },

  // Header
  header: {
    backgroundColor: GREEN,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerLogo: { width: 50, height: 50, borderRadius: 6 },
  headerBrandText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  notifBtn: {
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 3 },
  subGreeting: { color: "rgba(255,255,255,0.85)", fontSize: 13 },

  scroll: { flex: 1, marginTop: -14 },

  // Collector Card
  collectorCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 18,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  collectorTopLabel: {
    fontSize: 11,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 12,
  },
  collectorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  collectorName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 7,
  },
  onTheWayBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e4f5ec",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  onTheWayDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GREEN,
    marginRight: 6,
  },
  onTheWayText: { color: GREEN, fontWeight: "700", fontSize: 12 },
  collectorActions: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    paddingVertical: 8,
    gap: 6,
  },
  actionText: { color: GREEN, fontWeight: "600", fontSize: 12 },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 14,
  },
  cardRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardRowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  viewAll: { color: GREEN, fontWeight: "600", fontSize: 12 },

  // Progress
  progressCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircleActive: { backgroundColor: GREEN },
  progressCircleInactive: { backgroundColor: "#e0e0e0" },
  progressConnector: {
    width: 2,
    minHeight: 16,
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  progressLabel: { fontSize: 13, fontWeight: "600", color: "#bbb" },
  progressLabelActive: { color: "#1a1a1a" },
  progressSublabel: { fontSize: 11, color: "#aaa", marginTop: 2 },

  // Map
  mapBox: {
    backgroundColor: "#dde8e3",
    borderRadius: 12,
    height: 130,
    position: "relative",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  etaRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  etaLabel: { fontSize: 12, color: "#888" },
  etaValue: { fontSize: 14, fontWeight: "800", color: GREEN },

  // Schedule
  todayBadge: {
    backgroundColor: GREEN,
    borderRadius: 20,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  todayBadgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
  },
  scheduleDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
  },
  scheduleTime: { fontSize: 12, color: "#666", marginBottom: 4 },
  scheduleLocRow: { flexDirection: "row", alignItems: "center" },
  scheduleLoc: { fontSize: 11, color: "#888" },
  onTheWaySmallBadge: {
    backgroundColor: "#e4f5ec",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },
  onTheWaySmallText: { color: GREEN, fontSize: 11, fontWeight: "700" },
  notStartedBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },
  notStartedText: { color: "#999", fontSize: 11, fontWeight: "600" },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingTop: 8,
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
