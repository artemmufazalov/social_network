const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let store = {

    _state: {
        postsData: {
            posts: [
                {
                    id: 103,
                    text: "Hello World, I'm the first post",
                    time: "03.07.2020",
                    likesCount: 8,
                },
                {
                    id: 102,
                    text: "some text",
                    time: "01.07.2020",
                    likesCount: 3,
                },
                {
                    id: 101,
                    text: "some text",
                    time: "29.06.2020",
                    likesCount: 0,
                }],
            newPost: {
                text: ""
            }
        },
        dialogsData: [
            {
                name: "John",
                id: 101,
                messages: [
                    {
                        time: "10.38",
                        from: "John",
                        to: "Me",
                        message: 'Hi!',
                    },
                    {
                        time: "10.40",
                        from: "Me",
                        to: "John",
                        message: 'Good morning!',
                    },
                    {
                        time: "10.41",
                        from: "John",
                        to: "Me",
                        message: 'How is your nothing?',
                    },
                    {
                        time: "10.41",
                        from: "Me",
                        to: "John",
                        message: 'I am good, thanks',
                    },
                    {
                        time: "10.42",
                        from: "John",
                        to: "Me",
                        message: 'Are u gonna out today?'
                    },
                    {
                        time: "10.42",
                        from: "John",
                        to: "Me",
                        message: 'about 6pm'
                    },
                    {
                        time: "10.45",
                        from: "Me",
                        to: "John",
                        message: 'Do not know yet. Maybe. '
                    },
                ]
            },
            {
                name: "Victor",
                id: 102,
                messages: ['Good evening', 'I have some issues to discuss. Please write me, email victor@mail.ru']
            },
            {
                name: "Kirill",
                id: 103,
                messages: ['Dude, your last photos are awesome!']
            },
            {
                name: "Valera",
                id: 104,
                messages: ['Hey', 'Check my new workout video']
            }
        ],
        newMessageData:{
            text:"",
        },
        profileInfoData: {},
    },
    _callSubscriber() {
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    getTime() {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let minutesString = minutes;
        if (minutes<10){
            minutesString = "0"+minutes;
        }
        let timeString = hours + "." + minutesString;
        return timeString;
    },

    dispatch(action) {
        // e.g. - action = {type:"ADD-POST"}

        if (action.type == ADD_POST) {
            let initialLikesCount = 0;
            let currentMaxID = this._state.postsData.posts[0].id;
            let postId = currentMaxID + 1;
            let postDate = new Date();
            let day = postDate.getDate();
            let month = postDate.getMonth() + 1;
            let year = postDate.getFullYear();
            let dayString = day;
            let monthString = month;
            if (day < 10) {
                dayString = "0" + day;
            }
            if (month < 10) {
                monthString = "0" + month;
            }
            let postTime = dayString + "." + monthString + "." + year;

            let newPost = {
                id: postId,
                text: this._state.postsData.newPost.text,
                time: postTime,
                likesCount: initialLikesCount,
            };
            this._state.postsData.posts.unshift(newPost);
            this._state.postsData.newPost.text = "";
            this._callSubscriber(this._state);
        } else if (action.type == UPDATE_NEW_POST_TEXT) {
            //{newText:""}
            this._state.postsData.newPost.text = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type == SEND_NEW_MESSAGE) {
            //{from: ,to: ,}
            let time = this.getTime();
            let to = action.to;
            let from = action.from;
            let newMessage = {
                time: time,
                from: from,
                to: to,
                message: this._state.newMessageData.text,
            }
            this._state.dialogsData[0].messages.push(newMessage);
            this._state.newMessageData.text="";
            this._callSubscriber(this._state);


        } else if(action.type==UPDATE_NEW_MESSAGE_TEXT) {
            //{text: ,}
            this._state.newMessageData.text = action.text;
            this._callSubscriber(this._state);
        }
        else {
            console.error("Input method for dispatch function does not exist");
        }
    }

}

export default store;

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const sendNewMessageActionCreator = (from, to) =>
    ({type: SEND_NEW_MESSAGE, from: from, to: to})

export const updateNewMessageTextActionCreator = (text) =>
    ({type:UPDATE_NEW_MESSAGE_TEXT, text:text,})

window.store = store;


