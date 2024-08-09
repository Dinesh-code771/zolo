import { View, Platform, TextInput, Button } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
export default function Modal() {
  const inputRef = useRef(null); // Initialize useRef with null
  const buttonRef = useRef(null);
  const handleFocus = () => {
    // inputRef.current.focus();
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        ref={inputRef} // Assign ref to TextInput component
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Type something..."
      />
      <Button ref={buttonRef} title="Focus Input" onPress={handleFocus} />
    </View>
  );
}
