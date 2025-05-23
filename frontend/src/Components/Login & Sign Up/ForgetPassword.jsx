// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../../Context/AppContext";
// // import "./LoginRegister.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "boxicons/css/boxicons.min.css";
// import "./ForgetPassword.css"

// const ForgetPassword = () => {
//     const { setToken, user, setUser } = useContext(AppContext);
//     const navigate = useNavigate();
//     const [isActive, setIsActive] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false); // State for password visibility

//     // Login form state
//     const [loginData, setLoginData] = useState({
//         email: "",
//         password: "",
//     });
//     const [loginErrors, setLoginErrors] = useState({});

//     // Register form state
//     const [registerData, setRegisterData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         password_confirmation: "",
//     });
//     const [registerErrors, setRegisterErrors] = useState({});

//     // Toggle password visibility
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     // async function handleLogin(e) {
//     //     e.preventDefault();

//     //     if (!loginData.email || !loginData.password) {
//     //         toast.error("Fill in all fields before proceeding!");
//     //         return;
//     //     }

//     //     setIsLoading(true);

//     //     try {
//     //         const res = await fetch("/api/login", {
//     //             method: "post",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify(loginData),
//     //         });
//     //         const data = await res.json();

//     //         console.log("Login response:", data);

//     //         if (data.errors) {
//     //             setLoginErrors(data.errors);
//     //             toast.error("Login failed. Please check your credentials.");
//     //         } else {
//     //             localStorage.setItem("token", data.token);
//     //             setToken(data.token);
//     //             setUser(data.user);
//     //             toast.success("Login successful!");

//     //             setTimeout(() => {
//     //                 if (data.user && data.user.role === "admin") {
//     //                     navigate("/admin/dashboard");
//     //                 } else {
//     //                     navigate("/client/dashboard");
//     //                 }
//     //             }, 100);
//     //         }
//     //     } catch (error) {
//     //         console.error("Login error:", error);
//     //         setLoginErrors({ general: ["An error occurred during login."] });
//     //         toast.error("An error occurred during login.");
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // }

//     // async function handleRegister(e) {
//     //     e.preventDefault();

//     //     if (!registerData.name || !registerData.email || !registerData.password) {
//     //         toast.error("Fill in all fields before proceeding!");
//     //         return;
//     //     }

//     //     setIsLoading(true);

//     //     try {
//     //         const res = await fetch("/api/register", {
//     //             method: "post",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify(registerData),
//     //         });
//     //         const data = await res.json();
//     //         if (data.errors) {
//     //             setRegisterErrors(data.errors);
//     //             toast.error("Registration failed. Please check the form.");
//     //         } else {
//     //             localStorage.setItem("token", data.token);
//     //             setToken(data.token);
//     //             toast.success("Registration successful!");
//     //             navigate("/");
//     //         }
//     //     } catch (error) {
//     //         console.error("Registration error:", error);

//     //         if (error.response && error.response.status === 422) {
//     //             const errorMessage =
//     //                 error.response.data.errors?.email?.[0] || "Email already exists!";
//     //             toast.error(errorMessage);
//     //             setRegisterErrors({ email: [errorMessage] });
//     //         } else {
//     //             setRegisterErrors({
//     //                 general: ["An error occurred during registration."],
//     //             });
//     //             toast.error("An error occurred during registration.");
//     //         }
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // }

//     async function handleSendCode(e) {
//         e.preventDefault();

//         if (!loginData.email) {
//             toast.error("Please enter your email!");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const res = await fetch("/api/forgot-password", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: loginData.email }),
//             });

//             const data = await res.json();
//             console.log("Response:", data);

//             if (res.ok) {
//                 toast.success("A verification code has been sent to your email.");
//                 // Optionally redirect to code verification page
//                 // navigate("/verify-code");
//             } else {
//                 toast.error(data.message || "Email not found.");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Something went wrong. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     }


//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//             />

//             {user ? (
//                 <div className="loading-cont">
//                     <div className="loading-spinner"></div>
//                 </div>
//             ) : (
//                 <div className={`cont ${isActive ? "actv" : ""}`}>
//                     <div className="forbox login">
//                         <form onSubmit={handleSendCode}>
//                             <h1>Forget Password</h1>

//                             <div className="inpbox">
//                                 <input
//                                     type="text"
//                                     placeholder="Email"
//                                     value={loginData.email}
//                                     onChange={(e) =>
//                                         setLoginData({ ...loginData, email: e.target.value })
//                                     }
//                                 />
//                                 <i className="bx bxs-envelope"></i>
//                             </div>

//                             <button type="submit" className="button-1">
//                                 Send
//                             </button>
//                             <button
//                                 type="button"
//                                 className="button-2"
//                                 onClick={() => setIsActive(false)}
//                             >
//                                 Cancel
//                             </button>

//                             <br />
//                             <br />
//                             <p>or login with social platforms</p>
//                             <div className="social-icons">
//                                 <a href="#">
//                                     <i className="bx bxl-google"></i>
//                                 </a>
//                                 <a href="#">
//                                     <i className="bx bxl-facebook"></i>
//                                 </a>
//                                 <a href="#">
//                                     <i className="bx bxl-github"></i>
//                                 </a>
//                                 <a href="#">
//                                     <i className="bx bxl-linkedin"></i>
//                                 </a>
//                             </div>
//                         </form>
//                     </div>

//                     <div className="togbox">
//                         <div className="togpanal toggle-left">
//                             <h1>Hello, Welcome!</h1>
//                             <p>Don't have an account?</p>
//                             <button
//                                 className="button register-btn"
//                                 onClick={() => setIsActive(true)}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                         <div className="togpanal toggle-right">
//                             <h1>Welcome Back!</h1>
//                             <p>Already have an account?</p>
//                             <button
//                                 className="button login-btn"
//                                 onClick={() => setIsActive(false)}
//                             >
//                                 Login
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ForgetPassword;