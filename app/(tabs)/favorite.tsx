import React from 'react';
import {ScrollView, Image, TouchableOpacity, Text, View, StyleSheet, Pressable} from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'expo-router';

interface Movies {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

export default function FavoriteScreen() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }} className="bg-black">
            <Text className="text-2xl font-bold my-5 text-center text-white">Deine Favoriten</Text>
            <Text className="text-base font-semibold mt-2 mb-6 text-center text-white">
                Hier findest du deine geherzten Kinofilme, welche du hier jederzeit bewerten oder entfernen kannst.
            </Text>
            {favorites.length === 0 ? (
                <Text className="text-lg my-5 text-center text-gray-500">Du hast noch keine Favoriten hinzugefügt.</Text>
            ) : (
                favorites.map((movie) => (
                    <View key={movie.id} className=" bg-neutral-800 p-4 mb-5 rounded-lg">
                        <Link href={`/Detail?id=${movie.id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <View className="items-center">
                                        {movie.poster_path && (
                                            <Image
                                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                                style={[styles.poster, { opacity: pressed ? 0.5 : 1 }]}
                                                alt={`${movie.title} Poster`}
                                            />
                                        )}
                                        <Text style={styles.title}>{movie.title.length > 19 ? `${movie.title.slice(0, 19)}...` : movie.title}</Text>
                                    </View>
                                )}
                            </Pressable>
                        </Link>
                        <TouchableOpacity
                            className="p-3 bg-orange-500 rounded"
                            onPress={() => removeFavorite(movie.id)}
                        >
                            <Text className="text-white text-center font-bold rounded">Entfernen</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    poster: {
        width: 200,
        height: 300,
        resizeMode: 'cover',
    },
});
