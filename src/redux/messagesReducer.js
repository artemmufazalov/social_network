import {getTime} from "./timeFunctions";

const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
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
};

export const messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_NEW_MESSAGE:
            //{from: ,to: ,}
            let time = getTime();
            let to = action.to;
            let from = action.from;
            let newMessage = {
                time: time,
                from: from,
                to: to,
                message: state.newMessageData.text,
            }
            state.dialogsData[0].messages.push(newMessage);
            state.newMessageData.text = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            //{text: ,}
            state.newMessageData.text = action.text;
            return state;
        default:
            return state;
    }
}

export const sendNewMessageActionCreator = (from, to) =>
    ({type: SEND_NEW_MESSAGE, from: from, to: to})

export const updateNewMessageTextActionCreator = (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, text: text,})
