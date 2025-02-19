import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount ? this.login({email, password}) : userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser  :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    updateName(userid, name) {
        try {
            this.account.updateName(userid, name);
        } catch (error) {
            console.log('Appwrite service :: updateName :: error', error);
        }
    }

    updateEmail(email, password) {
        try {
            this.account.updateEmail(email, password);
        } catch (error) {
            console.log('Appwrite service :: updateEmail :: error', error);
        }
    }
}

const authService = new AuthService();
export default authService;