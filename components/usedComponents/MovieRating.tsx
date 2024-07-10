import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StarIcon as SolidStarIcon } from 'react-native-heroicons/solid';
import { StarIcon as OutlineStarIcon } from 'react-native-heroicons/outline';

interface MovieRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
}

const MovieRating: React.FC<MovieRatingProps> = ({ rating, onRatingChange }) => {
    const handleRating = (newRating: number) => {
        onRatingChange(newRating);
    };

    return (
        <View className="flex flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    {rating >= star ? (
                        <SolidStarIcon color="orange" size={30} />
                    ) : (
                        <OutlineStarIcon color="orange" size={30} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default MovieRating;
