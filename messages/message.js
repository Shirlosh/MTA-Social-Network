class Message {
    constructor(id, message, date, sender_id, receiver_id)
    {
        this.id = id
        this.message = message
        this.sender_id = sender_id
        this.receiver_id = receiver_id
        this.sent_date = date
    }
}

module.exports = Message