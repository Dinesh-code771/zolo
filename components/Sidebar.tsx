// components/Sidebar.js
import React from "react";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      <TouchableOpacity>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Link href="/details"> details</Link>
      </TouchableOpacity>
      {/* Add more links as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  link: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 18,
  },
});

export default Sidebar;
