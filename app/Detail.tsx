import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform,
    StyleSheet,
    Button,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon as SolidHeartIcon } from 'react-native-heroicons/solid';
import { HeartIcon as OutlineHeartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useLocalSearchParams} from "expo-router";
import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import {useFavorites} from "@/context/FavoritesContext";
import MovieRating from '@/app/starRating'
import AsyncStorage from '@react-native-async-storage/async-storage';



const ios = Platform.OS == 'ios';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';
let {width, height} = Dimensions.get('window');

interface Genre {
    id: number;
    name: string;
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    genres: Genre[];
    overview: string;
}


export default function MovieScreen() {
    const route = useRoute();
    const { id } = route.params as { id: string };

    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(1); // Standardmäßig auf 1 setzen
    const [reviewText, setReviewText] = useState('');
    const [reviewPlace, setReviewPlace] = useState('');
    const [reviewPeople, setReviewPeople] = useState('');
    const [reviewDate, setReviewDate] = useState(new Date()); // Standardmäßig auf das aktuelle Datum setzen
    const [hasReviewed, setHasReviewed] = useState(false);



    const apiKey = '605da0b99648ed33e3e074aa75e4db7f';
    const detailUrl = `https://api.themoviedb.org/3/movie/${id}`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;



    useEffect(() => {
        fetchData();
        fetchCast();
    }, [id]);

    const fetchData = () => {
        axios.get(detailUrl, {
            params: {
                api_key: apiKey,
                language: 'de-DE'
            }
        }).then((response) => {
            setMovie(response.data);
        }).catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }
    const fetchCast = () => {
        axios.get(castUrl, {
            params: {
                api_key: apiKey,
                language: 'de-DE'
            }
        }).then((response) => {
            setCast(response.data.cast);
        }).catch((error) => {
            console.error('Error fetching cast: ', error);
        });
    };

    const isFavorite = favorites.some(favMovie => favMovie.id === movie?.id);

    const toggleFavorite = () => {
        if (isFavorite && movie) {
            removeFavorite(movie.id);
        } else if (movie) {
            addFavorite(movie);
        }
    };

    const handleOpenRatingModal = () => {
        setShowRatingModal(true);
    };



    const saveRating = async () => {
        setHasReviewed(true);
        const ratingData = {
            movieId: movie.id,
            title: movie.title,
            rating: rating,
            reviewText: reviewText,
            reviewPlace: reviewPlace,
            reviewPeople: reviewPeople,
            reviewDate: reviewDate,
        };

        try {
            // Speichere die Bewertung
            await AsyncStorage.setItem('lastMovieReview', JSON.stringify(ratingData));
            await AsyncStorage.setItem('movieReview_' + movie.id, JSON.stringify(ratingData));
            setShowRatingModal(false);
        } catch (error) {
            console.error('Error saving review: ', error);
        }
    };



    if(!movie){
        return <Text>Loading...</Text>
    }
    return  (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView className=" bg-black text-white">
                    <StatusBar style="light" translucent={true} />

                    <View className="flex items-center">
                        {movie.poster_path && (
                            <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                alt={`${movie.title} Poster`}
                                style={{width, height: height*0.55}}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)', 'rgb(0,0,0)']}
                                style={{width, height: height*0.40}}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />

                            </View>
                        )}
                        <Text className="text-white font-extrabold text-3xl my-4 text-center px-2 -mt-12">{movie.title}</Text>
                        <Text className="text-white mb-2">{movie.status} • {movie.release_date} • {movie.runtime} minutes</Text>
                        <Text className="text-white mb-6">{movie.genres.map((genre) => genre.name).join(' • ')}</Text>
                        <Text className="text-white mx-4 mb-6 text-justify">{movie.overview}</Text>

                        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                            {isFavorite ? (
                                <SolidHeartIcon color="red" size={30} />
                            ) : (
                                <OutlineHeartIcon color="red" size={30} />
                            )}
                            <Text className="text-white font-bold ml-2">
                                {isFavorite ? 'Film aus den Favoriten entfernen' : 'Film zu den Favoriten hinzufügen'}
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-white font-bold ">Movie Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
                        {cast.map((actor) => (
                            <View key={actor.id} className="items-center text-center p-2 mt-4 mb-12">
                                {actor.profile_path ? (
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }}
                                        alt={`${actor.name} Profile`}

                                        className="w-24 h-24 rounded-full mx-2 mb-2"
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: fallbackPersonImage }}
                                        alt={`${actor.name} Profile (Fallback)`}
                                        className="w-24 h-24 rounded-full mx-2 mb-2"
                                    />
                                )}
                                <Text className="text-white text-center text-xs ">
                                    {actor?.name.length>15? actor.name.slice(0,15)+'...':actor.name}
                                </Text>
                                <Text className="text-gray-500 text-center text-xs ">
                                    {actor?.character.length>15? actor.character.slice(0,15)+'...': actor.character}
                                </Text>
                            </View>
                        ))}
                        </ScrollView>
                        {/* Bewertung hinzufügen Button */}
                        <TouchableOpacity onPress={() => setShowRatingModal(true)} className="mb-8">
                            <Text className="text-white font-bold">
                                {hasReviewed ? 'Du kannst dir deine Bewertung unter dem Reiter Bewertungen ansehen' : 'Füge eine Bewertung hinzufügen'}
                            </Text>
                        </TouchableOpacity>


                        {showRatingModal && (
                            <View>
                                <View className="mb-12">
                                    <Text className="text-white">Meine Bewertung: </Text>
                                    <View>
                                        <MovieRating onChangeText={setRating} />
                                    </View>
                                    <Text className="text-white mt-4 mb-1">So fand ich den Film: </Text>
                                    <TextInput
                                        placeholder="spannend, traurig, toll,..."
                                        className="text-white"
                                        value={reviewText}
                                        onChangeText={text => setReviewText(text)}
                                        multiline
                                        style={{ height: 100, width:330, borderColor: 'gray', borderWidth: 1, padding: 10 }}
                                    />
                                    <Text className="text-white mt-4 mb-1">Ich habe den Film gesehn in: </Text>
                                    <TextInput
                                        placeholder="Kino Wieselburg"
                                        className="text-white"
                                        value={reviewPlace}
                                        onChangeText={text => setReviewPlace(text)}
                                        style={{ height: 100, width:330, borderColor: 'gray', borderWidth: 1, padding: 10 }}
                                    />
                                    <Text className="text-white mt-4 mb-1">Im Kino war mit mir: </Text>
                                    <TextInput
                                        placeholder="Ines, Marvin, Claudia, ..."
                                        className="text-white"
                                        value={reviewPeople}
                                        onChangeText={text => setReviewPeople(text)}
                                        style={{ height: 100, width:330, borderColor: 'gray', borderWidth: 1, padding: 10 }}
                                    />


                                    <TextInput
                                        className="text-white mb-2"
                                        date={reviewDate}
                                        onDateChange={date => setReviewDate(date)}
                                    />
                                    <Button title="Save" onPress={saveRating} />
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}




const styles = StyleSheet.create({
    favoriteButton: {
        marginVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
    },

});