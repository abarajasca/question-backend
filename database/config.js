import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN )
    } catch (error) {
        console.log(error);
        throw new Error('Error when initialize DB');
    }

    console.log('DB online');
};

// module.exports = {
//     dbConnection
// }