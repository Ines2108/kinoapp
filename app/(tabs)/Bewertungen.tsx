import React, { useEffect, useState } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bewertungen = () => {
    const [movieReviews, setMovieReviews] = useState([]);

    // Funktion zum Laden der gespeicherten Bewertungen
    const loadMovieReviews = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const movieReviewKeys = keys.filter((key) => key.startsWith('movieReview_'));

            const reviews = await AsyncStorage.multiGet(movieReviewKeys);
            const movieReviewsData = reviews.map((review) => JSON.parse(review[1]));

            setMovieReviews(movieReviewsData);
            loadMovieReviews();
        } catch (error) {
            console.error('Error Filmbewertungen konnten nicht geladen werden: ', error);
        }
    };

    useEffect(() => {
        loadMovieReviews();
    }, []);


    const deleteReview = async (movieId: number) => {
        try {
            await AsyncStorage.removeItem('movieReview_' + movieId);
            setMovieReviews((prevReviews) => prevReviews.filter((review) => review.movieId !== movieId));
        } catch (error) {
            console.error('Error: Bewertung konnte nicht gelöscht werden: ', error);
        }
    };
    return (
        <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }} className="bg-black">
            <Text className="text-2xl font-bold my-5 text-center text-white">Deine Bewertungen</Text>
            <Text className="text-lg font-bold my-5 text-center text-white">
                Hier findest du deine Filmbewertungen:
            </Text>

            {movieReviews.map((review) => (
                <View key={review.movieId} style={{ marginBottom: 20 }} className="w-11/12 bg-neutral-900 p-4">
                    <Text className="text-white font-bold text-lg">{review.title}</Text>
                    <Text className="text-white">Bewertung: {review.rating}/5 Sterne</Text>
                    <Text className="text-white">Bewertungstext: {review.reviewText}</Text>
                    <Text className="text-white">Gesehen in: {review.reviewPlace}</Text>
                    <Text className="text-white">Datum: {review.reviewDate}</Text>
                    <Text className="text-white">Gesehen mit: {review.reviewPeople}</Text>
                    <TouchableOpacity onPress={() => deleteReview(review.movieId)} style={{ marginTop: 10 }}>
                        <Text className="text-red-500">Bewertung löschen</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default Bewertungen;
