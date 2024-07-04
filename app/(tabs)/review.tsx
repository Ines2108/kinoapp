import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReviewData {
    movieId: number;
    title: string;
    rating: number;
    reviewText: string;
    reviewPlace: string;
    reviewPeople: string;
    reviewDate: string;
    image: string;
}

const Review: React.FC = () => {
    const [movieReviews, setMovieReviews] = useState<ReviewData[]>([]);

    const loadMovieReviews = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const movieReviewKeys = keys.filter((key) => key.startsWith('movieReview_'));

            const reviews = await AsyncStorage.multiGet(movieReviewKeys);
            const movieReviewsData = reviews.map((review) => JSON.parse(review[1]));

            setMovieReviews(movieReviewsData);
        } catch (error) {
            console.error('Error loading movie reviews: ', error);
        }
    };

    useEffect(() => {
        loadMovieReviews();
    }, [movieReviews]); // Add movieReviews as dependency to refresh on change

    const deleteReview = async (movieId: number) => {
        try {
            const key = `movieReview_${movieId}`;
            await AsyncStorage.removeItem(key);
            setMovieReviews((prevReviews) => prevReviews.filter((review) => review.movieId !== movieId));
        } catch (error) {
            console.error('Error deleting review: ', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }} className="bg-black">
            <Text className="text-2xl font-bold my-5 text-center text-white">Deine Bewertungen</Text>
            <Text className="text-lg font-bold my-5 text-center text-white">
                Hier findest du deine Filmbewertungen:
            </Text>

            {movieReviews.length > 0 ? (
                movieReviews.map((review) => (
                    <View key={review.movieId} className="w-11/12 bg-neutral-900 p-4 mb-5">
                        <Text className="text-white font-bold text-lg">{review?.title}</Text>
                        <Text className="text-white">Bewertung: {review?.rating}/5 Sterne</Text>
                        <Text className="text-white">Bewertungstext: {review?.reviewText}</Text>
                        <Text className="text-white">Gesehen in: {review?.reviewPlace}</Text>
                        <Text className="text-white">Datum: {review?.reviewDate}</Text>
                        <Text className="text-white">Gesehen mit: {review?.reviewPeople}</Text>
                        {review?.image && (
                            <Image source={{ uri: review.image }} style={{ width: 200, height: 200, marginTop: 10 }} />
                        )}
                        <TouchableOpacity onPress={() => deleteReview(review.movieId)} className="mt-2">
                            <Text className="text-red-500">Bewertung löschen</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text className="text-white">Keine Bewertungen gefunden.</Text>
            )}
        </ScrollView>
    );
};

export default Review;
