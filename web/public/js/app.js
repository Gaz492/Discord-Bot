const app = new Vue({
    el: '#app',
    data: {chatLog: null},
    mounted () {
        axios
            .get('http://localhost:3000/chatLog')
            .then(response => (this.chatLog = response))
    }
});
