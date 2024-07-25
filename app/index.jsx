import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserPassword } from "@/redux/userSlice";
export default function Index() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [errorDetails, setErrorDetails] = useState({
    nameError: "",
    passwordError: "",
  });
  const dispatch = useDispatch();

  
  let isEveryThingGood = true;
  function checkPasswordValidate(password) {
    if (password.length >= 8) {
      return "";
    } else {
      isEveryThingGood = false;
      return "Password should be Greateer than 8 char";
    }
  }
  function handleValidation() {
    if (name.length === 0 || password.length === 0) {
      isEveryThingGood = false;
      setErrorDetails({
        passwordError:
          password.length === 0
            ? "Password is required"
            : checkPasswordValidate(password),
        nameError: name.length === 0 ? "Name is required" : "",
      });
    } else if (password.length > 0) {
      setErrorDetails({
        nameError: name.length === 0 ? "Name is required" : "",
        passwordError: checkPasswordValidate(password),
      });
    }
    return isEveryThingGood;
  }
  function handleLogin() {
    let isEveryThingGood = handleValidation();
    if (isEveryThingGood) {
      dispatch(setUser(name));
      dispatch(setUserPassword(password));
      setName("");
      setPassword("");
      navigation.navigate("products/index");
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles[errorDetails.nameError ? "errorInput" : "input"]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        {errorDetails.nameError && (
          <Text style={styles.error}>{errorDetails.nameError}</Text>
        )}
      </View>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles[errorDetails.passwordError ? "errorInput" : "input"]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your name"
        />
        {errorDetails.passwordError && (
          <Text style={styles.error}>{errorDetails.passwordError}</Text>
        )}
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorInput: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderColor: "red",
  },
  error: {
    color: "red",
  },
});
