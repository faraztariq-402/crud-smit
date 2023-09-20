import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './home.css'
const baseUrl = "http://localhost:5001";

const Post = () => {
    const userPostTitle = useRef(null);
    const userPostText = useRef(null);
    const [allPosts, setAllPosts] = useState([])
    const searchInputRef = useRef(null)

    // const searchHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get(`/api/v1/search?q=${searchInputRef.current.value}`);
    //         // console.log(response.data);

    //         setAllPosts([...response.data]);
    //     } catch (error) {
    //         console.log(error.data);
    //     }
    //     e.target.reset()
    // }
    const submitPostHandler = async (e) => {
        e.preventDefault();

        // Get the input values inside the submitPostHandler function
        const titleValue = userPostTitle.current.value;
        const textValue = userPostText.current.value;


        console.log(titleValue);
        console.log(textValue);

        try {
            const response = await axios.post(`${baseUrl}/api/v1/post`, {
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
            const response = await axios.get(`${baseUrl}/api/v1/posts`);
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
            <form action="" onSubmit={submitPostHandler}>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" placeholder="Enter a post title..." ref={userPostTitle} />
                <label htmlFor="postText">Post Text:</label>
                <input type="text" placeholder="Enter a post text..." ref={userPostText} />
                <button type="submit">Publish Post..</button>
            </form>
            <form action="" style={{ textAlign: "right" }} onSubmit={searchHandler}>
                <input type="search" placeholder="Search..." ref={searchInputRef} />
                <button type="submit" hidden></button>
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
