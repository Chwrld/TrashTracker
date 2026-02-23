import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
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

// ── Data ───────────────────────────────────────────────────────────────────────
const routes = ["All Route", "Route A", "Route B", "Route C"];

const upcoming = [
  {
    date: "Today, Jan 15",
    time: "8:00 AM - 10:00 AM",
    location: "Matina Aplaya, Davao City",
    status: "On the Way",
    isToday: true,
  },
  {
    date: "Thu, Jan 18",
    time: "8:00 AM - 10:00 AM",
    location: "Matina Aplaya, Davao City",
    status: "Not Started",
  },
  {
    date: "Mon, Jan 22",
    time: "8:00 AM - 10:00 AM",
    location: "Matina Aplaya, Davao City",
    status: "Not Started",
  },
  {
    date: "Thu, Jan 25",
    time: "8:00 AM - 10:00 AM",
    location: "Matina Aplaya, Davao City",
    status: "Not Started",
  },
];

const past = [
  {
    date: "Mon, Jan 12",
    time: "8:00 AM - 10:00 AM",
    location: "Matina Aplaya, Davao City",
    status: "Not Started",
  },
];

// ── Schedule Card ──────────────────────────────────────────────────────────────
function ScheduleCard({
  item,
  isPast,
}: {
  item: (typeof upcoming)[0];
  isPast?: boolean;
}) {
  const isOnWay = item.status === "On the Way";

  return (
    <View style={styles.card}>
      {/* Top row: calendar icon + date + status badge */}
      <View style={styles.cardTopRow}>
        <View style={styles.cardLeft}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={isPast ? "#bdbdbd" : GREEN}
            style={{ marginRight: 8 }}
          />
          {/* Today green pill OR plain date text */}
          {item.isToday ? (
            <View style={styles.todayPill}>
              <Text style={styles.todayPillText}>Today</Text>
            </View>
          ) : (
            <Text style={[styles.dateText, isPast && { color: "#bdbdbd" }]}>
              {item.date}
            </Text>
          )}
        </View>
        {/* Status badge */}
        {isOnWay ? (
          <View style={styles.badgeOnWay}>
            <Text style={styles.badgeOnWayText}>On the Way</Text>
          </View>
        ) : (
          <View style={styles.badgeNotStarted}>
            <Text style={styles.badgeNotStartedText}>Not Started</Text>
          </View>
        )}
      </View>

      {/* If today, show the actual date beneath the pill */}
      {item.isToday && (
        <Text
          style={[
            styles.dateText,
            { marginLeft: 24, marginTop: 2, marginBottom: 4 },
          ]}
        >
          {item.date}
        </Text>
      )}

      {/* Time row */}
      <View style={styles.infoRow}>
        <Ionicons
          name="time-outline"
          size={14}
          color="#aaa"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      {/* Location row */}
      <View style={styles.infoRow}>
        <Ionicons
          name="location-outline"
          size={14}
          color="#aaa"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
    </View>
  );
}

// ── Schedule Screen ────────────────────────────────────────────────────────────
export default function Schedule() {
  const [selectedRoute, setSelectedRoute] = useState(0);

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        {/* Brand row */}
        <View style={styles.brandRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>TrashTracker</Text>
        </View>
        <Text style={styles.pageTitle}>Collection Schedule</Text>
        <Text style={styles.pageSubtitle}>View upcoming and past pickups</Text>
      </View>

      {/* ── Route Tabs ── */}
      <View style={styles.routeTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routeTabs}
        >
          {routes.map((route, idx) => (
            <TouchableOpacity
              key={route}
              style={[
                styles.routeTab,
                selectedRoute === idx && styles.routeTabActive,
              ]}
              onPress={() => setSelectedRoute(idx)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.routeTabText,
                  selectedRoute === idx && styles.routeTabTextActive,
                ]}
              >
                {route}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming */}
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcoming.map((item, idx) => (
          <ScheduleCard key={idx} item={item} />
        ))}

        {/* Past Collections */}
        <Text style={styles.sectionTitle}>Past Collections</Text>
        {past.map((item, idx) => (
          <ScheduleCard key={idx} item={item} isPast />
        ))}
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
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },
  brandLogo: { width: 50, height: 50, borderRadius: 6 },
  brandText: { fontSize: 15, fontWeight: "700", color: GREEN },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 3,
  },
  pageSubtitle: { fontSize: 13, color: "#888" },

  // Route tabs
  routeTabsWrapper: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  routeTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  routeTab: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  routeTabActive: { backgroundColor: GREEN },
  routeTabText: { fontSize: 13, fontWeight: "600", color: GREEN },
  routeTabTextActive: { color: "#fff" },

  scroll: { flex: 1 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 20,
    marginBottom: 10,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  // Today pill
  todayPill: {
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  todayPillText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  dateText: { fontSize: 13, fontWeight: "700", color: "#222" },

  // Status badges
  badgeOnWay: {
    backgroundColor: "#e4f5ec",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  badgeOnWayText: { color: GREEN, fontWeight: "700", fontSize: 11 },
  badgeNotStarted: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  badgeNotStartedText: { color: "#999", fontWeight: "600", fontSize: 11 },

  // Info rows
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: { fontSize: 13, fontWeight: "600", color: "#333" },
  locationText: { fontSize: 12, color: "#888", fontWeight: "600" },

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
