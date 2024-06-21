import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: [],
    };
  }

  componentDidMount() {
    const kontakRef = ref(database, "Kontak");
    onValue(kontakRef, (snapshot) => {
      const data = snapshot.val();
      const kontaksArray = data ? (
        Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      ) : (
        <Text>Daftar kosong</Text>
      );
      this.setState({ kontaks: kontaksArray });
    });
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.padding}>List Contact</Text>
        <FlatList
          data={this.state.kontaks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("Detail", { kontak: item })
              }
            >
              <View style={styles.contactItems}>
                <Text style={styles.itemText}>{item.nama}</Text>
                <Text style={styles.itemDetail}>Lihat detail</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnAdding}
            onPress={() => this.props.navigation.navigate("Add Contact")}
          >
            <FontAwesome name="plus" size={22} color="#fff" />
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
    backgroundColor: "white",
  },
  wrapperButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnAdding: {
    padding: 20,
    backgroundColor: "#397eed",
    borderRadius: 30,
    elevation: 10,
    shadowColor: "#52006A",
  },
  padding: {
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
    fontSize: 20,
    textTransform: "uppercase",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  itemDetail: {
    color: "#397eed",
  },
});
