import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(formData);
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/");
      }
    } catch (error) {
      const message = error.response?.data;
      setError(message.message);
    }
  };

  return (
    <View className="flex-1 flex flex-col gap-y-3 items-center px-5 justify-center">
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/036/154/950/non_2x/ai-generated-lion-head-mascot-logo-png.png",
        }}
        className="w-[100px] h-[100px]"
      />

      <Text className="w-full text-center font-semibold text-lg">
        Welcome back!
      </Text>

      <View className="h-fit w-full flex flex-col gap-x-1 ">
        <Text>Email</Text>
        <TextInput
          className="border-[1px] border-black w-full p-1 mt-1 rounded-sm"
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />

        <Text className="mt-4">Password</Text>
        <TextInput
          className="border-[1px] border-black w-full p-1 mt-1 rounded-sm"
          value={formData.password}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
        />

        {error && <Text className="text-red-500 w-full mt-2"> {error}</Text>}
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-black rounded-sm w-full p-2 mt-3"
      >
        <Text className="w-full text-center font-semibold text-white">
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
