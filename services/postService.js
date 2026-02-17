import { Post } from "../models/postModel.js";

export function createPostService(title,content,userId){
    const newPost = new Post({
        title,
        content,
       user: userId
    });
    return newPost.save();  
}
    
