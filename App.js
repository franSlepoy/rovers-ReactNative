import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function App() {
  const [rovers, setRovers] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos obtenidos:", data); 
        setRovers(data.photos || []); // ✅ Asegura que siempre sea un array
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setRovers([]); 
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Fotos del Rover Curiosity</Text>

      {Array.isArray(rovers) && rovers.length > 0 ? (
        rovers.map((rover) => (
          <View key={rover.id} style={styles.card}>
            <Text style={styles.cameraName}>{rover.camera.full_name}</Text>
            <Image source={{ uri: rover.img_src }} style={styles.image} />
          </View>
        ))
      ) : (
        <Text style={styles.loading}>Cargando imágenes...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "orange",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#444",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cameraName: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
