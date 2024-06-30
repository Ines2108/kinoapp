import {StyleSheet, Image, ScrollView, Pressable} from "react-native";
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "expo-router";

interface Movies {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const UpcomingCinemaMovies = () => {
    const [movies, setMovies] = useState<Movies[]>([]);
    const apiKey = '605da0b99648ed33e3e074aa75e4db7f';
    const upcoming = "https://api.themoviedb.org/3/movie/upcoming";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(upcoming, {
            params: {
                api_key: apiKey,
                language: 'de-DE'
            }
        }).then((response) => {
            const result = response.data.results;
            setMovies(result);
        }).catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.moviesContainer}>
            {movies.map((item) => (
                <View className="mr-6" key={item.id}>
                    <Link href={`/Detail?id=${item.id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View className="mr-6 items-center">
                                    {item.poster_path && (
                                        <>
                                            <Image
                                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                                style={[styles.poster, { opacity: pressed ? 0.5 : 1 }]}
                                                alt={`${item.title} Poster`}/>
                                        </>
                                    )}
                                    <Text style={styles.title}>{item.title.length > 19 ? `${item.title.slice(0, 19)}...` : item.title}</Text>
                                    <Text></Text>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    moviesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    movieContainer: {
        marginRight: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
    },
    poster: {
        width: 200,
        height: 300,
        resizeMode: 'cover',
    },
});

export default UpcomingCinemaMovies;
