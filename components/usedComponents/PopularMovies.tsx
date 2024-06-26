import { StyleSheet, Image, ScrollView } from "react-native";
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from "react";
import axios from "axios";

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
                <View style={styles.movieContainer} key={item.id}>
                    {item.poster_path && (
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={styles.poster}
                            alt={`${item.title} Poster`}
                        />
                    )}
                    <Text style={styles.title}>{item.title.length > 19 ? `${item.title.slice(0, 19)}...` : item.title}</Text>
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

export default PopularMovies;
