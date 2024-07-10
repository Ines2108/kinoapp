import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from "react";
import axios from "axios";
import PopularMovies from "@/components/usedComponents/PopularMovies";
import CurrentCinemaMovies from "@/components/usedComponents/CurrentCinemaMovies";
import UpcomingCinemaMovies from "@/components/usedComponents/UpcomingCinemaMovies";
import TopRatedMovies from "@/components/usedComponents/TopRatedMovies";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function TabOneScreen() {

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText} className="text-orange-500">Willkommen bei Cinemy!</Text>
        <Text style={styles.infoText}>Hier findest du die neuesten Kinofilme, welche du jederzeit herzen und bewerten kannst.</Text>
        <Text style={styles.headerText}>Derzeit beliebt</Text>
        <PopularMovies/>
        <Text style={styles.headerText}>Aktuell im Kino</Text>
        <CurrentCinemaMovies/>
        <Text style={styles.headerText}>Bald im Kino</Text>
        <UpcomingCinemaMovies/>
        <Text style={styles.headerText}>Die besten Filme aller Zeiten</Text>
        <TopRatedMovies/>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
