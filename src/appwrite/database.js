import config from "../conf/Config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class databaseService {
  client = new Client();
  databases;
  bucket;
  queries;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDBID,
        config.appwriteColID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: createPost :: error :: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDBID,
        config.appwriteColID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: updatePost :: error :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDBID,
        config.appwriteColID,
        slug
      );
    } catch (error) {
      console.log("Appwrite service:: deletePost :: error :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDBID,
        config.appwriteColID,
        slug
      );
    } catch (error) {
      console.log("Appwrite service:: getPost :: error :: ", error);
      return false;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDBID,
        config.appwriteColID,
        queries
      );
    } catch (error) {
      console.log("Appwrite service:: getAllPost :: error :: ", error);
      return false;
    }
  }

  // file upload
  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service:: uploadImage :: error :: ", error);
    }
  }

  async deleteImage(fileId) {
    try {
      const deleted = await this.bucket.deleteFile(
        config.appwriteBucketID,
        fileId
      );
      if (deleted) {
        return true;
      }
    } catch (error) {
      console.log("Appwrite service:: deleteImage :: error :: ", error);
    }
  }

  dowloadImage(fileId) {
    try {
      return this.bucket.getFileDownload(config.appwriteBucketID, fileId);
    } catch (error) {
      console.log("Appwrite service:: getfileDownload :: error :: ", error);
    }
  }

  getImagepreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketID, fileId);
    } catch (error) {
      console.log("Appwrite service:: getImagepreview :: error :: ", error);
    }
  }
}

const dataBaseSerivce = new databaseService();

export default dataBaseSerivce;
