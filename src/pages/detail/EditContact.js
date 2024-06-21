import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { database } from "../../config/firebase";
import { ref, update } from "firebase/database";

export default class EditContact extends Component {
  constructor(props) {
    super(props);

    const { kontak } = this.props.route.params;

    this.state = {
      id: kontak.id,
      nama: kontak.nama,
      noHp: kontak.noHp,
      email: kontak.email,
      alamat: kontak.alamat,
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onUpdate = () => {
    const { id, nama, noHp, email, alamat } = this.state;
    const kontakRef = ref(database, `Kontak/${id}`);
    update(kontakRef, { nama, noHp, email, alamat })
      .then(() => {
        Alert.alert("Sukses", "Data berhasil diubah", [
          {
            text: "OK",
            onPress: () =>
              this.props.navigation.navigate("Detail", { kontak: this.state }),
          },
        ]);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  onCancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.page}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={this.state.nama}
          onChangeText={(value) => this.onChangeText("nama", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="No HP"
          value={this.state.noHp}
          onChangeText={(value) => this.onChangeText("noHp", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(value) => this.onChangeText("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat"
          value={this.state.alamat}
          onChangeText={(value) => this.onChangeText("alamat", value)}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonSave} onPress={this.onUpdate}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={this.onCancel}>
            <Text style={styles.buttonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSave: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
