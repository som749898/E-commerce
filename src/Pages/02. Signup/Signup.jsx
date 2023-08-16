export const Signup = () => {
  const getToken = async () => {
    const credentials = {
      email: "adarshbalika@gmail.com",
      password: "adarshbalika"
    }
    try {
      const generateToken = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(res => res.json())
      localStorage.setItem("token",generateToken.encodedToken);
    } catch(e) {
      console.log(e)
    }
  }
  return <div>
    <h1>Sign up</h1>
    <button onClick={getToken}>get token</button>
  </div>
}