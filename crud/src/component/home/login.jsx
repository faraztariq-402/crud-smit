import axios from "axios"

const Login = () =>{
const loginHandler = async () =>{
const response = await axios.post("/api/v1/login", {
    
})
}
return(


    <div>
<form action="" onSubmit={loginHandler}>
<input type="email" ref={loginEmail} placeholder="Email Address" />
<input type="password" ref={loginPassword} placeholder="Password" />
<button type="submit">Login</button>

</form>

    </div>
)

}
export default Login