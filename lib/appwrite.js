import { ID, Account, Client, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.bup.unimate',
    projectId: '67ca716b0002b8034a0a',
    databaseId: '67ca74cd0004402617c3',
    userCollectionId: '67ca74d90011855d9a30',
    storageId: '67ca77be00380bcf05da'
}


// Init my React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
    
    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export const createUser = async (email, password, username) => {
        try {
            const newAccount = await account.create(ID.unique(), email, password, username);
    
            if (!newAccount) {
                throw new Error("Account creation failed.");
            }

            const avatarUrl = avatars.getInitials(username);
    
            const newUser = await databases.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl,
                }
            );
    
            if (!newUser) {
                throw new Error("Failed to create user profile.");
            }
    
            return newUser;
    
        } catch (error) {
            console.log("CreateUser Error:", error.message);
            throw new Error(error.message);
        }
    };
    

export const signIn = async (email, password) => {
    try {
        // Check if a session already exists before creating a new one
        const existingUser = await getCurrentUser();
        if (existingUser) {
            throw new Error("Already signed in. Please log out first.");
        }

        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get(); // Get active session

        if (!currentAccount) {
            return null;
        }

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser.documents.length) {
            return null;
        }

        return currentUser.documents[0];
    } catch (error) {
        return null;
    }
};



 export const logout = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        throw new Error(error);
    }
};

