import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import AddContact from "../pages/contact";
import Detail from "../pages/detail";
import EditContact from "../pages/detail/EditContact";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add Contact" component={AddContact} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Edit Contact" component={EditContact} />
    </Stack.Navigator>
  );
};

export default Router;
