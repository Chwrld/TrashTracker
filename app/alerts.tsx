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

// ── Notification Data ──────────────────────────────────────────────────────────
type NotifType = "info" | "schedule" | "success" | "warning";

const notifications: {
  type: NotifType;
  title: string;
  message: string;
  time: string;
}[] = [
  {
    type: "info",
    title: "Collection On the Way",
    message: "Marco Rodriguez is heading to your area. ETA: 8 minutes.",
    time: "2 mins ago",
  },
  {
    type: "schedule",
    title: "Collection Tomorrow",
    message:
      "Remember to put out your bins tonight for tomorrow's collection at 8:00 AM.",
    time: "1 hour ago",
  },
  {
    type: "success",
    title: "Collection Completed",
    message: "Your garbage was collected successfully on Jan 12.",
    time: "3 days ago",
  },
  {
    type: "warning",
    title: "Schedule Change",
    message:
      "Due to the holiday, Monday's collection has been moved to Tuesday!",
    time: "5 days ago",
  },
];

// Icon + colors per type
const typeConfig: Record<
  NotifType,
  { icon: string; bg: string; iconColor: string }
> = {
  info: {
    icon: "information-circle-outline",
    bg: "#e8f4fd",
    iconColor: "#4A90D9",
  },
  schedule: { icon: "time-outline", bg: "#e8f5ef", iconColor: GREEN },
  success: {
    icon: "checkmark-circle-outline",
    bg: "#e8f5ef",
    iconColor: GREEN,
  },
  warning: { icon: "warning-outline", bg: "#fff8e6", iconColor: "#F5A623" },
};

// ── Single Notification Card ───────────────────────────────────────────────────
function NotifCard({
  type,
  title,
  message,
  time,
}: {
  type: NotifType;
  title: string;
  message: string;
  time: string;
}) {
  const config = typeConfig[type];
  return (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        {/* Icon */}
        <View style={[styles.iconCircle, { backgroundColor: config.bg }]}>
          <Ionicons
            name={config.icon as any}
            size={22}
            color={config.iconColor}
          />
        </View>
        {/* Text */}
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardMessage}>{message}</Text>
          <Text style={styles.cardTime}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

// ── Alerts Screen ──────────────────────────────────────────────────────────────
export default function Alerts() {
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

        {/* Page title row */}
        <View style={styles.titleRow}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#1a1a1a"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageSubtitle}>2 new alerts</Text>
          </View>
        </View>
      </View>

      {/* ── Notifications List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notif, idx) => (
          <NotifCard key={idx} {...notif} />
        ))}

        {/* Clear all */}
        <TouchableOpacity style={styles.clearBtn} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={15} color="#888" />
          <Text style={styles.clearText}>Clear all notifications</Text>
        </TouchableOpacity>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  brandLogo: { width: 50, height: 50, borderRadius: 6 },
  brandText: { fontSize: 15, fontWeight: "700", color: GREEN },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: { fontSize: 20, fontWeight: "800", color: "#1a1a1a" },
  pageSubtitle: { fontSize: 13, color: "#888", marginTop: 1 },

  scroll: { flex: 1 },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 13,
    color: "#555",
    lineHeight: 19,
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "500",
  },

  // Clear button
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
    paddingVertical: 10,
  },
  clearText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
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
