import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // Importiere ReactNode
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface FavoritesContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movieId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {},
});

// Definiere eine Props-Schnittstelle für den Provider
interface FavoritesProviderProps {
    children: ReactNode; // Verwende ReactNode für 'children'
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData !== null) {
                setFavorites(JSON.parse(favoritesData));
            }
        } catch (error) {
            console.error('Error loading favorites: ', error);
        }
    };

    const saveFavorites = async (updatedFavorites: Movie[]) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error saving favorites: ', error);
        }
    };

    const addFavorite = (movie: Movie) => {
        const updatedFavorites = [...favorites, movie];
        saveFavorites(updatedFavorites);
    };

    const removeFavorite = (movieId: number) => {
        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        saveFavorites(updatedFavorites);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
