import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export const addIncoming = async (incomingData) => {
    try {
        const incomingRef = firestore().collection("incoming").doc();
        await incomingRef.set(incomingData);
        return { id: incomingRef.id, ...incomingData };
    } catch (error) {
        console.error("Error adding incoming:", error);
        throw error;
    }
};