import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform,
    Button,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon as SolidHeartIcon } from 'react-native-heroicons/solid'
import { HeartIcon as OutlineHeartIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { useFavorites } from '@/context/FavoritesContext'
import MovieRating from '@/components/usedComponents/MovieRating'  // Passen Sie den Importpfad entsprechend an
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

const ios = Platform.OS == 'ios'
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'
let { width, height } = Dimensions.get('window')

interface Genre {
    id: number
    name: string
}

interface Cast {
    id: number
    name: string
    character: string
    profile_path: string
}

interface Movie {
    id: number
    title: string
    poster_path: string
    release_date: string
    runtime: number
    status: string
    genres: Genre[]
    overview: string
}

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

export default function MovieScreen() {
    const route = useRoute()
    const { id } = route.params as { id: string }

    const [movie, setMovie] = useState<Movie | null>(null)
    const [cast, setCast] = useState<Cast[]>([])
    const { favorites, addFavorite, removeFavorite } = useFavorites()
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [rating, setRating] = useState(1) // Standardmäßig auf 1 setzen
    const [reviewText, setReviewText] = useState('')
    const [reviewPlace, setReviewPlace] = useState('')
    const [reviewPeople, setReviewPeople] = useState('')
    const [reviewDate, setReviewDate] = useState(new Date()) // Standardmäßig auf das aktuelle Datum setzen
    const [hasReviewed, setHasReviewed] = useState(false)
    const [image, setImage] = useState<string | null>(null)

    const apiKey = '605da0b99648ed33e3e074aa75e4db7f'
    const detailUrl = `https://api.themoviedb.org/3/movie/${id}`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits`

    useEffect(() => {
        fetchData()
        fetchCast()
    }, [id])

    const fetchData = () => {
        axios.get(detailUrl, {
            params: {
                api_key: apiKey,
                language: 'de-DE',
            },
        }).then((response) => {
            setMovie(response.data)
        }).catch((error) => {
            console.error('Error fetching data: ', error)
        })
    }
    const fetchCast = () => {
        axios.get(castUrl, {
            params: {
                api_key: apiKey,
                language: 'de-DE',
            },
        }).then((response) => {
            setCast(response.data.cast)
        }).catch((error) => {
            console.error('Error fetching cast: ', error)
        })
    }

    const isFavorite = favorites.some((favMovie) => favMovie.id === movie?.id)

    const toggleFavorite = () => {
        if (isFavorite && movie) {
            removeFavorite(movie.id)
        } else if (movie) {
            addFavorite(movie)
        }
    }

    const handleOpenRatingModal = () => {
        setShowRatingModal(true)
    }

    const saveRating = async () => {
        setHasReviewed(true);
        const ratingData = {
            movieId: movie.id,
            title: movie.title,
            rating: rating,
            reviewText: reviewText,
            reviewPlace: reviewPlace,
            reviewPeople: reviewPeople,
            reviewDate: reviewDate.toISOString(), // Convert date to string format
            image: image || '',  // Ensure image path is included or empty string
        };

        try {
            await AsyncStorage.setItem('lastMovieReview', JSON.stringify(ratingData));
            await AsyncStorage.setItem(`movieReview_${movie.id}`, JSON.stringify(ratingData));
            setShowRatingModal(false);
        } catch (error) {
            console.error('Error saving review: ', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    if (!movie) {
        return <Text>Loading...</Text>
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView className="bg-black text-white">
                    <StatusBar style="light" translucent={true} />

                    <View className="flex items-center">
                        {movie.poster_path && (
                            <View>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                    alt={`${movie.title} Poster`}
                                    style={{ width, height: height * 0.55 }}
                                    className="w-full h-4/6"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)', 'rgb(0,0,0)']}
                                    style={{ width, height: height * 0.4 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0 w-full h-2/6"
                                />
                            </View>
                        )}
                        <Text className="text-white font-extrabold text-3xl my-4 text-center px-2 -mt-12">
                            {movie.title}
                        </Text>
                        <Text className="text-white mb-2">
                            {movie.status} • {movie.release_date} • {movie.runtime} minutes
                        </Text>
                        <Text className="text-white mb-6">
                            {movie.genres.map((genre) => genre.name).join(' • ')}
                        </Text>
                        <Text className="text-white mx-4 mb-6 text-justify">{movie.overview}</Text>

                        <TouchableOpacity onPress={toggleFavorite} className="flex-row items-center my-2">
                            {isFavorite ? (
                                <SolidHeartIcon color="red" size={30} />
                            ) : (
                                <OutlineHeartIcon color="red" size={30} />
                            )}
                            <Text className="text-white font-bold ml-2">
                                {isFavorite
                                    ? 'Film aus den Favoriten entfernen'
                                    : 'Film zu den Favoriten hinzufügen'}
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-white font-bold">Movie Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-4">
                            {cast.map((castMember) => (
                                <View key={castMember.id} className="flex items-center m-2">
                                    <Image
                                        source={{
                                            uri: castMember.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                                                : fallbackPersonImage,
                                        }}
                                        alt={castMember.name}
                                        className="w-20 h-20 rounded-full"
                                    />
                                    <Text className="text-white text-center text-xs">{castMember.name}</Text>
                                    <Text className="text-neutral-400 text-center text-xs">als {castMember.character}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="flex items-center mt-4">
                        <TouchableOpacity
                            onPress={handleOpenRatingModal}
                            className="bg-purple-600 p-2 rounded mb-10"
                        >
                            <Text className="text-white font-bold">Bewertung abgeben</Text>
                        </TouchableOpacity>
                    </View>

                    {showRatingModal && (
                        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 justify-center items-center p-5">
                            <View className="bg-black p-5 rounded w-full">
                                <Text className="mb-2 text-lg font-bold">Bewerte den Film</Text>
                                <MovieRating rating={rating} onRatingChange={setRating} />
                                <TextInput
                                    placeholder="Bewertungstext"
                                    value={reviewText}
                                    onChangeText={setReviewText}
                                    className="border border-gray-300 text-white p-2 my-2"
                                />
                                <TextInput
                                    placeholder="Wo hast du den Film gesehen?"
                                    value={reviewPlace}
                                    onChangeText={setReviewPlace}
                                    className="border border-gray-300 text-white p-2 my-2"
                                />
                                <TextInput
                                    placeholder="Mit wem hast du den Film gesehen?"
                                    value={reviewPeople}
                                    onChangeText={setReviewPeople}
                                    className="border border-gray-300 text-white p-2 my-2"
                                />
                                <TouchableOpacity onPress={pickImage} className="bg-red-600 p-2 rounded my-2">
                                    <Text className="text-white text-center">Bild hochladen</Text>
                                </TouchableOpacity>
                                {image && (
                                    <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />
                                )}
                                <Button title="Speichern" onPress={saveRating} />
                                <Button title="Abbrechen" onPress={() => setShowRatingModal(false)} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
