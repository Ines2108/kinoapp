import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid'; // Beispiel für Icon-Import

const MovieRating = () => {
    const [rating, setRating] = useState(0); // Zustand für die Bewertung, standardmäßig 0 Sterne

    const handleStarPress = (starNumber) => {
        setRating(starNumber); // Setze die Bewertung auf die angeklickte Sternenzahl
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} className="mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity className="mb-4" key={star} onPress={() => handleStarPress(star)}>
                    {star <= rating ? (
                        <StarIcon fill="yellow" width={30} height={30} />
                    ) : (
                        <StarIcon fill="grey" width={30} height={30} />
                    )}
                </TouchableOpacity>
            ))}
            <Text classname="text-white">{rating}/5 Sterne</Text>
        </View>
    );
};

export default MovieRating;
