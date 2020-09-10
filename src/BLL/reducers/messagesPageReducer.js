import {getTimeString} from "../../utils/functions/timeFunctions";

//Action types
const SEND_NEW_MESSAGE = "messagesPageReducer/SEND_NEW_MESSAGE";

//Initial state
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
                    message: 'Good morning! How are you feeling after what has been recently',
                },
                {
                    id: 1003,
                    time: "10.41",
                    from: "John",
                    to: "Me",
                    message: 'I am good, thanks. Actually, even better than I have expected',
                },
                {
                    id: 1004,
                    time: "10.41",
                    from: "Me",
                    to: "John",
                    message: 'So, will you join us in new journey tomorrow?',
                },
                {
                    id: 1005,
                    time: "10.42",
                    from: "John",
                    to: "Me",
                    message: 'I need to think a little. I will inform you in the evening'
                },
                {
                    id: 1006,
                    time: "10.42",
                    from: "John",
                    to: "Me",
                    message: 'around 8 pm, I suppose'
                },
                {
                    id: 1007,
                    time: "10.45",
                    from: "Me",
                    to: "John",
                    message: 'Well, write ASAP'
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
};

//Reducer
const messagesPageReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case SEND_NEW_MESSAGE: {
            let id = state.dialogsData[0].messages[state.dialogsData[0].messages.length - 1].id + 1;
            let newMessage = {
                id: id,
                time: getTimeString(),
                from: action.from,
                to: action.to,
                message: action.newMessageBody,
            }
            stateCopy = {
                ...state,
                dialogsData: [...state.dialogsData],
            };
            stateCopy.dialogsData[0].messages.push(newMessage);
            return stateCopy;
        }
        default:
            return state;
    }
}

export default messagesPageReducer;

//Action creators
export const sendNewMessage = (from, to, newMessageBody) =>
    ({type: SEND_NEW_MESSAGE, from, to, newMessageBody})

