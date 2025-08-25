import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import "../global.css";

export default function index() {
  const router = useRouter();

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
    try {
      const response = await axios.get("http://localhost:8000/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
      router.replace("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View className="w-full h-full flex items-center justify-center bg-white">
      <Text className="text-4xl font-bold text-red-500">Hello, Sansar!</Text>
    </View>
  );
}
