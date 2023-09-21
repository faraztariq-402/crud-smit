import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './home.css'
// const baseUrl = "http://localhost:5001";

const Post = () => {
    const userPostTitle = useRef(null);
    const userPostText = useRef(null);
    const [allPosts, setAllPosts] = useState([])
    const searchInputRef = useRef(null)

    const submitPostHandler = async (e) => {
        e.preventDefault();

        // Get the input values inside the submitPostHandler function
        const titleValue = userPostTitle.current.value;
        const textValue = userPostText.current.value;
if(!titleValue && !textValue){
    alert("Please enter your values")
    return
}

        console.log(titleValue);
        console.log(textValue);

        try {
            const response = await axios.post(`/api/v1/post`, {
                title: titleValue,
                text: textValue,
            });
            getAllPost()
            console.log(response.data);
            // getAllPost();
        } catch (error) {
            // handle error
            console.log(error.data);
        }
    };
    const getAllPost = async () => {
        try {
            const response = await axios.get(`/api/v1/posts`);
            console.log(response.data);
            // console.log(response.data.text);
            setAllPosts([...response.data])



        } catch (error) {
            console.log(error.data);
        }
    };

    useEffect(() => {
        getAllPost()
    }, [])

    const searchHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("searchInputRef value:", searchInputRef.current.value);
            const response = await axios.get(`/api/v1/search?q=${searchInputRef.current.value}`);

            console.log(response.data);

            setAllPosts([...response.data]);
        } catch (error) {
            console.log(error.data);
        }
        e.target.reset()
    }

    return (
        <>
            <form action="" className="search" style={{ textAlign: "center" }} onSubmit={searchHandler}>
                <input type="search" placeholder="Search..." ref={searchInputRef} />
                <button type="submit" hidden></button>
            </form>
            <form action="" className="submit" onSubmit={submitPostHandler}>
                <label htmlFor="postTitle">Post Title:</label><br />
                <input type="text" placeholder="Enter a post title..." ref={userPostTitle} /><br />
                <label htmlFor="postText">Post Text:</label><br />
                <input type="text" placeholder="Enter a post text..." ref={userPostText} />
                <button type="submit">Publish Post..</button>
            </form>
            <div className="allPosts">

                {allPosts.map((post, index) => (
                    <div key={index} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                        <button type="">Edit</button>
                        <button type="">Delete</button>
                    </div>
                ))}

            </div>
        </>
    );
};

export default Post;
