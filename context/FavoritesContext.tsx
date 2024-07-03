// FavoritesContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

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

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    const addFavorite = (movie: Movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    };

    const removeFavorite = (movieId: number) => {
        setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
