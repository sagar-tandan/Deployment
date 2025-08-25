import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid Email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth", formData);
      if (response.status == 200) {
        // console.log(response.data);
        const data = response?.data;
        const token = data?.token;
        const user = data?.user;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        router.replace("/"); 
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <View className="flex-1 flex-col items-center gap-4 px-6">
      <Text className="text-xl font-bold">Welcome Back!</Text>
      <View className="flex flex-col gap-3 w-full">
        <Text className="text-lg">Email</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="Email"
          autoCapitalize={false}
          keyboardType="email-address"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        ></TextInput>

        <Text className="text-lg">Password</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="********"
          autoCapitalize={false}
          secureTextEntry={true}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
        ></TextInput>

        {error && <Text className="text-red-500">{error}</Text>}
      </View>

      {/* Login Button */}

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-black w-full p-3 rounded-md mt-4"
      >
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
