import { StyleSheet, ScrollView } from "react-native";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from "react";
import axios from "axios";
import PopularMovies from "@/components/PopularMovies";
import CurrentCinemaMovies from "@/components/CurrentCinemaMovies";
import UpcomingCinemaMovies from "@/components/UpcomingCinemaMovies";
import TopRatedMovies from "@/components/TopRatedMovies";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function TabOneScreen() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const apiKey = '605da0b99648ed33e3e074aa75e4db7f';

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>Herzlich Willkommen bei unserer Kinoapp!</Text>
        <Text style={styles.infoText}>Hier findest du die neuesten Kinofilme, welche du jederzeit herzen und bewerten kannst. Du findest deine Filme unter "Favoriten".</Text>
        <Text style={styles.headerText}>Derzeit beliebt</Text>
        <PopularMovies/>
        <Text style={styles.headerText}>Aktuell im Kino</Text>
        <CurrentCinemaMovies/>
        <Text style={styles.headerText}>Bald im Kino</Text>
        <UpcomingCinemaMovies/>
        <Text style={styles.headerText}>Die besten Filme aller Zeiten</Text>
        <TopRatedMovies/>
        <EditScreenInfo path="app/(tabs)/index.tsx" />

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  moviesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerText: {
    marginTop: 25,
    marginLeft: 5,
    marginBottom: 40,
    color: "white",
    fontWeight: "500",
    fontSize: 25,
  },
  poster: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});
