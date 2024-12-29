import { Client, Account, ID, 
    Avatars, Databases, Query 
} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nita.AttendanceHub',
    projectId: '6769bb4a000d82b7e884',
    databaseId: '6769bedc00162ba1bbf9',
    userCollectionId: '6769bf0500086dc0e068',

}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.
    

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, name, enrollment) {
    // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name,
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                name: name,
                enrollment: enrollment,
                avatar: avatarUrl,
            }
        )

        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try{
        const session= await account.createEmailPasswordSession(email, password);
        return session;
    }
    catch(error) {
        throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async() => {
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser)    throw Error;

        return currentUser.documents[0];
    }
    catch(error) {
        throw new Error(error);
    }
}




