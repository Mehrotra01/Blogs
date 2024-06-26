import Config from "../conf/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(Config.appwriteUrl)
      .setProject(Config.appwriteProID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login(email, password);
        // return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service:: createAccount :: error :: ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite service:: login :: error :: ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser :: error :: ", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      // return await this.account.deleteSession('current');
    } catch (error) {
      console.log("Appwrite service:: logout :: error :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
