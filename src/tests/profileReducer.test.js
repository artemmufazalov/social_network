import {profileReducer, addPost, deletePost} from "../redux/profileReducer";

let state = {
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
};

test("length of posts array should be incremented", () => {
    //1. test data
    let action = addPost("some new post text");

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(4);
});
test("new post text is added correctly", () => {
    //1. test data
    let action = addPost("some new post text");

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[0].text).toBe("some new post text");
});

test("after deleting length of posts array should be decremented", () => {
    //1. test data
    let action = deletePost(101);

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(2);
});

test ("after deleting length shouldn't be decremented if id is incorrect", ()=>{
    //1. test data
    let action = deletePost(1005);

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3);
})

