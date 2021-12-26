const { update_json_file } = require("../data/json_file_handling")
const Message = require("./message")
const gi = require('../generate_id')

const json_messages = 'data/messages.json'

class MessagesList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
                this.messages_array.push(new Message(data.id, data.text, data.sent_date, data.sender_id, data.receiver_id))});
        }
    }

    messages_array = [];

    add_message(message, sender_id, receiver_id)
    {
        const new_message = new Message(gi.create_unique_id(this.messages_array), message, new Date(Date.now()).toDateString(), sender_id, receiver_id)
        this.messages_array.push(new_message)
        update_json_file(this.messages_array,json_messages)
        return new_message
    }

    get_messages(user_id)
    {
        const user_messages = []

        for(message in this.messages_array)
        {
            if(user_id === message.receiver_id)
            {
                user_messages.push(message)
            }
        }
        return user_messages
    }

    get_index(id)
    {
        const index = this.messages_array.findIndex(post => post.id == id)
        return index
    }

    get_list()
    {
        return this.messages_array
    }

    get_sender(id)
    {
        const index = this.get_index(id)
        if(index >= 0) return this.messages_array[index].sender
        else return null
    }

    get_receiver(id)
    {
        const index = this.get_index(id)
        if(index >= 0) return this.messages_array[index].sender
        else return null
    }
}

module.exports = MessagesList