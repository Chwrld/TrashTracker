import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const GREEN = "#11995D";

type Status = "Not Started" | "On the Way" | "Collecting" | "Completed";

const stops = [
  { address: "123 Oak Street", time: "8:00 AM", done: true },
  { address: "145 Oak Street", time: "8:15 AM", done: true },
  { address: "167 Oak Street", time: "8:30 AM", current: true },
  { address: "189 Oak Street", time: "8:45 AM", done: false },
  { address: "211 Oak Street", time: "9:00 AM", done: false },
  { address: "233 Oak Street", time: "9:15 AM", done: false },
];

export default function CollectorDashboard() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Status>("On the Way");
  const [gpsSharing, setGpsSharing] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const statuses: Status[] = [
    "Not Started",
    "On the Way",
    "Collecting",
    "Completed",
  ];

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* ── Green Header ── */}
      <View style={styles.header}>
        {/* Top bar */}
        <View style={styles.headerTopBar}>
          <View style={styles.brandRow}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>TrashTracker</Text>
          </View>

          {/* 3-dot menu button */}
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
            style={styles.menuBtn}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Collector info row */}
        <View style={styles.collectorInfoRow}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color="#bdbdbd" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.goodMorning}>Good Morning</Text>
            <Text style={styles.collectorName}>Marco{"\n"}Rodriguez</Text>
          </View>
          <View style={styles.onWayBadge}>
            <View style={styles.onWayDot} />
            <Text style={styles.onWayText}>On the Way</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Stops Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>
      </View>

      {/* ── Dropdown Menu Modal ── */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Tap outside to close */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          {/* Popout menu — top right */}
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={18} color="#e74c3c" />
              <Text style={styles.dropdownLogoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* ── Scrollable Content ── */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Update Status Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Update Status</Text>
          <View style={styles.statusGrid}>
            {statuses.map((s) => {
              const isActive = selectedStatus === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusBtn, isActive && styles.statusBtnActive]}
                  onPress={() => setSelectedStatus(s)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.statusBtnText,
                      isActive && styles.statusBtnTextActive,
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── GPS Location Sharing Card ── */}
        <View style={[styles.card, styles.gpsCard]}>
          <View style={styles.gpsLeft}>
            <View style={styles.gpsIconCircle}>
              <Ionicons name="location-outline" size={20} color={GREEN} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.gpsTitle}>GPS Location Sharing</Text>
              <Text style={styles.gpsSub}>Residents can see your location</Text>
            </View>
          </View>
          <Switch
            value={gpsSharing}
            onValueChange={setGpsSharing}
            trackColor={{ false: "#e0e0e0", true: GREEN }}
            thumbColor="#fff"
          />
        </View>

        {/* ── Today's Route ── */}
        <View style={styles.card}>
          <View style={styles.routeHeader}>
            <Text style={styles.cardTitle}>Todays Route</Text>
            <View style={styles.zoneBadge}>
              <Text style={styles.zoneBadgeText}>Zone A – Downtown</Text>
            </View>
          </View>

          {stops.map((stop, idx) => (
            <View key={idx} style={styles.stopRow}>
              <View style={styles.timelineCol}>
                <View
                  style={[
                    styles.timelineDot,
                    stop.done
                      ? styles.timelineDotDone
                      : stop.current
                        ? styles.timelineDotCurrent
                        : styles.timelineDotPending,
                  ]}
                >
                  {stop.done && (
                    <Ionicons name="checkmark" size={10} color="#fff" />
                  )}
                </View>
                {idx < stops.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      stop.done
                        ? styles.timelineLineDone
                        : styles.timelineLinePending,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stopInfo}>
                <View style={styles.stopInfoRow}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.stopAddress,
                        stop.done && styles.stopAddressDone,
                        stop.current && styles.stopAddressCurrent,
                      ]}
                    >
                      {stop.address}
                    </Text>
                    <Text style={styles.stopTime}>{stop.time}</Text>
                  </View>
                  {stop.current && (
                    <View style={styles.consoleBadge}>
                      <Text style={styles.consoleBadgeText}>Console</Text>
                    </View>
                  )}
                </View>
                {idx < stops.length - 1 && <View style={styles.stopDivider} />}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom Action Buttons ── */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.pauseBtn} activeOpacity={0.8}>
          <Text style={styles.pauseText}>Pause Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} activeOpacity={0.8}>
          <Text style={styles.skipText}>Skip Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  // Header
  header: {
    backgroundColor: GREEN,
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandLogo: { width: 26, height: 26, borderRadius: 6 },
  brandText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  menuBtn: { padding: 4 },

  // Collector info
  collectorInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  goodMorning: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 2,
  },
  collectorName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 26,
  },
  onWayBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  onWayDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#fff" },
  onWayText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  // Stats
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.12)",
    borderRadius: 14,
    paddingVertical: 14,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: "800", color: "#fff" },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.25)" },

  // Dropdown menu
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownMenu: {
    position: "absolute",
    top: 96,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 4,
    minWidth: 140,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownLogoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e74c3c",
  },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
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
    marginBottom: 12,
  },

  // Status grid
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusBtn: {
    width: "48%",
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  statusBtnActive: { borderColor: GREEN, backgroundColor: "#eaf6f1" },
  statusBtnText: { fontSize: 13, fontWeight: "600", color: "#999" },
  statusBtnTextActive: { color: GREEN },

  // GPS card
  gpsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gpsLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  gpsIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eaf6f1",
    alignItems: "center",
    justifyContent: "center",
  },
  gpsTitle: { fontSize: 14, fontWeight: "700", color: "#1a1a1a" },
  gpsSub: { fontSize: 11, color: "#aaa", marginTop: 2 },

  // Route
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  zoneBadge: {
    backgroundColor: "#eaf6f1",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  zoneBadgeText: { fontSize: 11, color: GREEN, fontWeight: "700" },

  // Stops
  stopRow: { flexDirection: "row" },
  timelineCol: { alignItems: "center", width: 24, marginRight: 12 },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  timelineDotDone: { backgroundColor: GREEN },
  timelineDotCurrent: {
    backgroundColor: GREEN,
    borderWidth: 3,
    borderColor: "#a8e6c8",
  },
  timelineDotPending: { backgroundColor: "#e0e0e0" },
  timelineLine: { width: 2, flex: 1, marginTop: 2, marginBottom: 2 },
  timelineLineDone: { backgroundColor: GREEN },
  timelineLinePending: { backgroundColor: "#e0e0e0" },
  stopInfo: { flex: 1 },
  stopInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 2,
  },
  stopAddress: { fontSize: 13, fontWeight: "600", color: "#888" },
  stopAddressDone: { color: "#aaa", textDecorationLine: "line-through" },
  stopAddressCurrent: { color: "#1a1a1a", fontWeight: "700" },
  stopTime: { fontSize: 11, color: "#bbb", marginTop: 2 },
  consoleBadge: {
    backgroundColor: GREEN,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  consoleBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  stopDivider: { height: 1, backgroundColor: "#f5f5f5", marginBottom: 2 },

  // Bottom actions
  bottomActions: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#efefef",
  },
  pauseBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pauseText: { fontSize: 15, fontWeight: "700", color: "#1a1a1a" },
  skipBtn: {
    flex: 1,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  skipText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
