import {getTime} from "./timeFunctions";

const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

let initialState = {
    dialogsData: [
        {
            name: "John",
            id: 101,
            messages: [
                {
                    id: 1001,
                    time: "10.38",
                    from: "John",
                    to: "Me",
                    message: 'Hi!',
                },
                {
                    id: 1002,
                    time: "10.40",
                    from: "Me",
                    to: "John",
                    message: 'Good morning!',
                },
                {
                    id: 1003,
                    time: "10.41",
                    from: "John",
                    to: "Me",
                    message: 'How is your nothing?',
                },
                {
                    id: 1004,
                    time: "10.41",
                    from: "Me",
                    to: "John",
                    message: 'I am good, thanks',
                },
                {
                    id: 1005,
                    time: "10.42",
                    from: "John",
                    to: "Me",
                    message: 'Are u gonna out today?'
                },
                {
                    id: 1006,
                    time: "10.42",
                    from: "John",
                    to: "Me",
                    message: 'about 6pm'
                },
                {
                    id: 1007,
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
    let stateCopy;
    switch (action.type) {
        case SEND_NEW_MESSAGE: {
            //{from: ,to: ,}
            let id = state.dialogsData[0].messages[state.dialogsData[0].messages.length - 1].id + 1;
            let time = getTime();
            let to = action.to;
            let from = action.from;
            let newMessage = {
                id: id,
                time: time,
                from: from,
                to: to,
                message: state.newMessageData.text,
            }

            //firstly we get dialogsData from state, then override them with the new data below
            stateCopy = {
                ...state,
                dialogsData: [...state.dialogsData],
                newMessageData: {...state.newMessageData},
            };

            stateCopy.dialogsData[0].messages.push(newMessage);
            stateCopy.newMessageData.text = "";
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            //{text: ,}

            stateCopy = {
                ...state,
                newMessageData: {
                    ...state.newMessageData,
                    text: action.text,
                },
            };

            //stateCopy.newMessageData.text = action.text;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const sendNewMessage = (from, to) =>
    ({type: SEND_NEW_MESSAGE, from: from, to: to})

export const updateNewMessageText = (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, text: text,})
