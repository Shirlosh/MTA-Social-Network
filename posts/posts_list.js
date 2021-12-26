const { update_json_file } = require("../data/json_file_handling")
const Post = require("./post")
const gi = require('../generate_id')

const json_posts = 'data/posts.json'

class PostsList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
                this.posts_array.push(new Post(data.id, data.text, data.creation_date, data.creator_id))});
        }
    }

    posts_array = [];

    add_post(text, creator_id)
    {
        const new_post = new Post(gi.create_unique_id(this.posts_array), text, new Date(Date.now()).toDateString(), creator_id)
        this.posts_array.push(new_post)
        update_json_file(this.posts_array,json_posts)
        return new_post
    }

    get_index(id)
    {
        const index = this.posts_array.findIndex(post => post.id == id)
        return index
    }

    delete_post(id)
    {
        let index = this.get_index(id)
        if (index === -1 ) return -1
	
	    this.posts_array.splice(index, 1)
        update_json_file(this.posts_array,json_posts)
        return 0;
    }

    get_list()
    {
        return this.posts_array
    }

    get_creator_id(id)
    {
        const index = this.get_index(id)
        if(index >= 0)   return this.posts_array[index].creator_id
        else return null
    }
}

module.exports = PostsList