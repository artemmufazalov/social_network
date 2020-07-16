import {postsReducer} from "./postsReducer";
import {messagesReducer} from "./messagesReducer";

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
        messagesPage: {
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
            newMessageData: {
                text: "",
            },
        },
    },
    _callSubscriber() {
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state.postsData = postsReducer(this._state.postsData, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    }

}

export default store;

window.store = store;


