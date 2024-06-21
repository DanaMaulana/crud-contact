import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function InputForm({
  label,
  placeholder,
  keyboardType,
  isTextArea,
  onChangeText,
  namaState,
  value,
}) {
  if (isTextArea) {
    return (
      <View>
        <Text style={styles.label}>{label}: </Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={placeholder}
          style={[styles.textInput, { textAlignVertical: "top" }]}
          keyboardType={keyboardType}
          value={value}
          onChangeText={(text) => onChangeText(namaState, text)}
        />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.label}>{label}: </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(namaState, text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  textInput: {
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
    borderRadius: 3,
  },
});
