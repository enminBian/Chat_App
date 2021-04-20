
export default {
    props: ['msg'],

    template: `
        <p class="new-message" :class="{ 'my-message' : matchedID }" :style="styleObj">
            <img class="message-avatar" :src="msg.message.avatar">
            <span class="message-content">
                <span class="prompt">{{msg.message.name}} says:</span>
                {{msg.message.content}}
            </span>
        </p>
    `,

    data: function() {
        return this.$parent.socketID == this.msg.id ? {
            matchedID: true,
            styleObj: {
                color: 'white',
                borderColor: 'none',
                backgroundColor: this.msg.color
            }
        } : {
            matchedID: false,
            styleObj: {
                color: this.msg.color,
                borderColor: this.msg.color,
                backgroundColor: 'white'
            }
        };
    }
};