import React, { useState, useRef} from "react"
import axios from "axios"
import Swal from "sweetalert2"
const baseUrl = "http://localhost:5001"
const SignUp = () =>{
    let firstNameRef = useRef(null)
    let lastNameRef = useRef(null)
    let emailRef = useRef(null)
    let passwordRef= useRef(null)
const signUpHandler = async (e) =>{
e.preventDefault()
if(!passwordRef.current.value || !emailRef.current.value || !firstNameRef.current.value || !lastNameRef.current.value){
    Swal.fire("Please Fill All Fields")
    return
  }
try{

    const addUser = await axios.post(`${baseUrl}/api/v1/signup`, {
        firstName:  firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
        
    })
    Swal.fire("User Signup Successful")
    console.log("user signup successfull", addUser.data)
}catch(e){
    Swal.fire(e.response.data.message)
    // console.log("error", e)
    console.log("error", e.response.data.message)
}
}

return(
<div>
    <form action="" onSubmit={signUpHandler}>
        
<input type="text" placeholder="First Name" ref={firstNameRef}/><br />
<input type="text" placeholder="Last Name" ref={lastNameRef}/><br />
<input type="email" placeholder="Email Address" ref={emailRef}/><br />
<input type="password" placeholder="Password" ref={passwordRef}/><br /><button type="submit">Signup</button>
    </form>

</div>

)


}

export default SignUp
