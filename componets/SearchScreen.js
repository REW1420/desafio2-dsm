import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { SearchBar } from "@rneui/themed";
import COLORS from "./COLORS";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

export default function SearchScreen() {
  const [dogImages, setDogImages] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  async function get() {
    await fetch(`https://dog.ceo/api/breed/${query.toLowerCase()}/images`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          Toast.show({
            type: "error",
            text1: "No se encontro la raza",
            text2: "Debe ser nombre en ingles",
            position: "top",
            visibilityTime: 3000,
          });
        } else {
          console.log(data.status);
          setStatus(data.status);

          let limit = data.message.slice(0, 20);

          setDogImages(limit);
        }
      });
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.primary_backgroud }}>
        <View style={styles.secondary_backgroud}>
          <View style={styles.containerTopLeft}>
            <SearchBar
              placeholder="Buscar por raza"
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onCancel=""
              onChangeText={(text) => {
                setQuery(text)
              }}
              value={query}
            />

            <TouchableOpacity style={{ padding: 10 }}>
              <Icon
                name="paw-outline"
                size={35}
                color={"white"}
                onPress={() => {
                  console.log(status);
                  get();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.primary_backgroud}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Buscador imagenes de perritos {query}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            {dogImages.map((item, i) => {
              return (
                <Image
                  key={i}
                  style={styles.tinyLogo}
                  source={{
                    uri: item,
                  }}
                />
              );
            })}
          </View>
        </View>
        <Toast ref={Toast.setRef} />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  secondary_backgroud: {
    backgroundColor: COLORS.secondary_backgroud,
    width: "100%",
    height: 150,
  },
  primary_backgroud: {
    backgroundColor: COLORS.primary_backgroud,
    padding: 10 * 2,
    borderRadius: 10 * 3,
    bottom: 10 * 3,
  },

  containerTopLeft: {
    flexDirection: "row",
    alignItems: "center",
    top: 30,
    margin: 30,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: 0,
    marginRight: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    marginLeft: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: "400",
    color: "#444",
  },

  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
  },
  tinyLogo: {
    width: width / 1.5,
    height: height / 3,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
