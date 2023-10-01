import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import './home.css'
const baseUrl = "http://localhost:5001";

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
        if (!titleValue && !textValue) {
            alert("Please enter your values")
            return
        }

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
            console.log(baseUrl)
            const response = await axios.get(`${baseUrl}/api/v1/posts`);
            // for (let i = 0; i < response.data.length; i++) {
            //     // console.log(response.data[i]._id);

            // }
            // editHandler(response.data._id)
            // console.log("response id",response.data)
            // console.log(response.data.text);
            setAllPosts([...response.data])
            // console.log("response.data", response.data);
            // console.log("faraz")


        } catch (error) {
            console.log(error.data);
        }
    };

    useEffect(() => {
        getAllPost()
    }, [])
    const editHandler = async (id, title, text) => {
      console.log("id", id);
      console.log("title", title);
      console.log("text", text);
      try {
        // Use SweetAlert prompt to get updated data from the user
        const result = await Swal.fire({
          title: 'Edit Post',
          html:
            `<input id="swal-input-title" value="${title}" class="swal2-input" placeholder="New Title">` +
            `<input id="swal-input-text" value="${text}" class="swal2-input" placeholder="New Text">`,
          showCloseButton: true, // Add a close button
          focusConfirm: false,
          preConfirm: () => {
            return {
              title: document.getElementById('swal-input-title').value,
              text: document.getElementById('swal-input-text').value,
            };
          },
        });
        const updatedData = result.value
        if(!updatedData.title || !updatedData.text){
          Swal.fire("Please Fill Both the fields")
          return
        }
        console.log("result", result)
        if (result.dismiss === 'close') {
          return; // Do nothing if the user closed the prompt
        }
        console.log("updated data", updatedData)
        if (updatedData.title && updatedData.text) {
          const response = await axios.put(`${baseUrl}/api/v1/post/${id}`, updatedData);
    
          if (response.status === 200) {
            // Post was successfully edited
            Swal.fire({
              icon: 'success',
              title: 'Post Edited',
              text: 'The post has been edited successfully!',
              confirmButtonColor: '#553c51',
            });
    getAllPost()
            // You can also trigger a reload of the posts or perform other actions here.
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to edit the post. Please try again later.',
              confirmButtonColor: '#553c51',
            });
          }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No Changes Made',
            text: 'You did not make any changes to the post.',
            confirmButtonColor: '#553c51',
          });
        }
      } catch (e) {
        console.error('Error editing post:', e);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while editing the post. Please try again later.',
          confirmButtonColor: '#553c51',
        });
      }
    };
    
      
    const deleteHandler = async (postId) => {
        console.log("delete id", postId);
        try {
            // const response = await axios.delete(`${baseUrl}/api/v1/post/${postId}`);

            const response = await axios.delete(`${baseUrl}/api/v1/post/${postId}`);
            Swal.fire("Post Deleted")
            getAllPost()
            console.log("response", response);
        } catch (e) {
            console.log("error", e);
        }
    }

    // const deleteHandler = (postId) => {
    //     Swal.fire({
    //         title: 'Enter Password',
    //         input: 'password',
    //         inputAttributes: {
    //             autocapitalize: 'off'
    //         },
    //         showCancelButton: true,
    //         cancelButtonColor: "#553c51",
    //         confirmButtonText: 'Delete',
    //         confirmButtonColor: "#553c51",
    //         showLoaderOnConfirm: true,
    //         preConfirm: (password) => {
    //             if (password === '12345') {

    //                 return axios.delete(`/api/v1/post/${postId}`)
    //                     .then(response => {
    //                         // console.log(response.data);
    //                         Swal.fire({
    //                             icon: 'success',
    //                             title: 'Post Deleted',
    //                             timer: 1000,
    //                             showConfirmButton: false
    //                         });

    //                         renderPost();
    //                     })
    //                     .catch(error => {
    //                         console.log(error.data);
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Failed to delete post',
    //                             showConfirmButton: false
    //                         });
    //                     });
    //             } else {

    //                 return Swal.fire({
    //                     icon: 'error',
    //                     title: 'Invalid Password',
    //                     text: 'Please enter correct password',
    //                     timer: 1000,
    //                     showConfirmButton: false
    //                 });
    //             }
    //         }
    //     });
    // }

    const searchHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("searchInputRef value:", searchInputRef.current.value);
            const response = await axios.get(`${baseUrl}/api/v1/search?q=${searchInputRef.current.value}`);

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
                        <button type="" onClick={() => editHandler(post._id, post.title,post.text)}>Edit</button>
                        <button type="" onClick={() => deleteHandler(post._id)}>Delete</button>
                    </div>
                ))}

            </div>
        </>
    );
};

export default Post;
