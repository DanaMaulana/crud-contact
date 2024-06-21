import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { database } from "../../config/firebase";
import { ref, remove } from "firebase/database";

export default class Detail extends Component {
  handleEdit = () => {
    const { kontak } = this.props.route.params;
    this.props.navigation.navigate("Edit Contact", { kontak });
  };

  handleDelete = () => {
    const { kontak } = this.props.route.params;
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin menghapus data ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: () => {
            const kontakRef = ref(database, `Kontak/${kontak.id}`);
            remove(kontakRef)
              .then(() => {
                Alert.alert("Sukses", "Data dihapus", [
                  {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("Home"),
                  },
                ]);
              })
              .catch((error) => {
                console.error("Error deleting document: ", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  render() {
    const { kontak } = this.props.route.params;

    return (
      <View style={styles.page}>
        <Text style={styles.label}>Nama: {kontak.nama}</Text>
        <Text style={styles.label}>No HP: {kontak.noHp}</Text>
        <Text style={styles.label}>Email: {kontak.email}</Text>
        <Text style={styles.label}>Alamat: {kontak.alamat}</Text>
        <View style={styles.itemsAction}>
          <TouchableOpacity style={styles.actionUbah} onPress={this.handleEdit}>
            <Text style={styles.actionText}>Ubah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionHapus}
            onPress={this.handleDelete}
          >
            <Text style={styles.actionText}>Hapus</Text>
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
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  itemsAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    gap: 10,
    paddingVertical: 10,
  },
  actionUbah: {
    borderRadius: 5,
    backgroundColor: "#ffe45e",
    width: "40%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionHapus: {
    borderRadius: 5,
    backgroundColor: "#ff6392",
    width: "40%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
});
