import {StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Pressable} from "react-native";
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {Link, router} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import MovieScreen from "@/app/Detail";

interface Movies {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const PopularMovies = () => {
    const [movies, setMovies] = useState<Movies[]>([]);
    const apiKey = '605da0b99648ed33e3e074aa75e4db7f';
    const popular = "https://api.themoviedb.org/3/movie/popular";


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        axios.get(popular, {
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
                <View className="mr-6" key={item.id} className="bg-black">
                    <Link href={`/Detail?id=${item.id}`} asChild>
                        <Pressable >
                            {({ pressed }) => (
                                <View className="mr-6 items-center bg-black">
                                    {item.poster_path && (
                                        <>
                                        <Image
                                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                            style={[styles.poster, { opacity: pressed ? 0.5 : 1 }]}
                                            alt={`${item.title} Poster`}/>
                                        </>
                                    )}
                                    <Text style={styles.title}className="text-white">{item.title.length > 17 ? `${item.title.slice(0, 17)}...` : item.title} </Text>
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

export default PopularMovies;
