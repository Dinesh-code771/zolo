import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from "expo-router/build/Route";
import CheckBox from "@react-native-community/checkbox";
import { router } from "expo-router";
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
      AsyncStorage.setItem("userName", name);
      AsyncStorage.setItem("userPassword", password);

      setName("");
      setPassword("");
      navigation.navigate("home/index");
    }
  }
  // check if user is already logged in
  useEffect(() => {
    async function getLoginDetails() {
      const savedUser = await AsyncStorage.getItem("userName");
      const password = await AsyncStorage.getItem("userPassword");
      console.log(savedUser, password);
      if (savedUser && password) {
        console.log("entered");
        navigation.navigate("home/index");
      }
    }
    getLoginDetails();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "data:image/png;base64,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",
          }}
          style={{ width: "80%", height: "80%" }}
          resizeMode="contain"
        />
        {/* <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles[errorDetails.nameError ? "errorInput" : "input"]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        {errorDetails.nameError && (
          <Text style={styles.error}>{errorDetails.nameError}</Text>
        )} */}
      </View>
      <View
        style={{
          flex: 8,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          // Elevation for Android
          // elevation: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 10,
            gap: 5,
            borderColor: "#D3D3D3",
            borderWidth: 1,
            height: "auto",
            borderRadius: 10,
          }}
        >
          <Text style={styles.heading}>Login</Text>
          {/* email */}
          <View>
            <Text style={styles.label}>Email or Mobile number</Text>
            <TextInput
              style={styles[errorDetails.nameError ? "errorInput" : "input"]}
              value={name}
              onChangeText={setName}
              placeholder=""
            />
            {errorDetails.nameError && (
              <Text style={styles.error}>{errorDetails.nameError}</Text>
            )}
          </View>
          {/* password */}
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles[errorDetails.nameError ? "errorInput" : "input"]}
              value={password}
              onChangeText={setPassword}
              placeholder=""
            />
            {errorDetails.nameError && (
              <Text style={styles.error}>{errorDetails.nameError}</Text>
            )}
          </View>
          {/* login button */}
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              backgroundColor: "#f1c75f",
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "lightBlack",
            }}
          >
            <TouchableHighlight onPress={handleLogin}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableHighlight>
          </View>
          {/* create button */}
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Keep me signed in . Details
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              gap: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              New to Amazon?
            </Text>
            <TouchableHighlight
              style={{
                backgroundColor: "#ebedef",
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "lightBlack",
              }}
              onPress={handleLogin}
            >
              <Text style={{ color: "black", textAlign: "center" }}>
                Create Your Amazon Account
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        {/* <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles[errorDetails.passwordError ? "errorInput" : "input"]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your name"
        />
        {errorDetails.passwordError && (
          <Text style={styles.error}>{errorDetails.passwordError}</Text>
        )} */}
      </View>
      {/* <Button title="Login" onPress={handleLogin} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: 4,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 36,
    marginBottom: 8,

    fontStyle: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
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
