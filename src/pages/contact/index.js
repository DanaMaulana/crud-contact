import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import React, { Component } from "react";
import InputForm from "./inputForm";
import { database } from "../../config/firebase";
import { ref, push } from "firebase/database";

export default class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      noHp: "",
      email: "",
      alamat: "",
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (
      this.state.nama &&
      this.state.noHp &&
      this.state.email &&
      this.state.alamat
    ) {
      const kontakReferensi = ref(database, "Kontak");
      const kontak = {
        nama: this.state.nama,
        noHp: this.state.noHp,
        email: this.state.email,
        alamat: this.state.alamat,
      };
      push(kontakReferensi, kontak)
        .then((data) => {
          Alert.alert("Berhasil", "Data telah ditambahkan");
          this.props.navigation.replace("Home");
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    } else {
      Alert.alert(
        "Peringatan",
        "Harap pastikan semua bagian formulir telah diisi"
      );
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputForm
          label="Nama"
          placeholder="Masukkan nama"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputForm
          label="No.hp"
          placeholder="Masukkan nomor handphone"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.noHp}
          namaState="noHp"
        />
        <InputForm
          label="Email"
          placeholder="Masukkan email"
          onChangeText={this.onChangeText}
          value={this.state.email}
          namaState="email"
        />
        <InputForm
          label="Alamat"
          placeholder="Alamat"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.alamat}
          namaState="alamat"
        />

        <TouchableOpacity onPress={() => this.onSubmit()}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  button: {
    backgroundColor: "#397eed",
    paddingVertical: 5,
    borderRadius: 7,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});
