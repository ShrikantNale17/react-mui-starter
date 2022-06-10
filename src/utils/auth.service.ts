import { BehaviorSubject } from "rxjs";
import { get, patch, post, put } from "./http/httpMethods";
import Cookie from "js-cookie";
import Cookies from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast, showSuccessToast } from "./toastUtil";
import { defaultUsers } from "../@types/user";

let currentUserFromStorage: any;

/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
  //   if (currentUserFromStorage) {
  //     loadCurrentUser();
  //   }
} catch (e) {
  showErrorToast("Could not find user in local storage");
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
const currentOrganizationSubject = new BehaviorSubject(
  (currentUserFromStorage &&
    currentUserFromStorage._org &&
    currentUserFromStorage._org[0]) ||
    undefined
);

/*
 * Export as a Type
 */
export const authenticationService = {
  logout,
  authToken,
  register,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  setPassword,
  isUserAndTokenAvailable,
  replyToComment,
  likeToComment,
  verifyOTP,
  AddPost,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  forgotPassword,
  sendVerification,
  likeToReply,
  addComment,
  getPosts,
  like,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },

  currentOrganization: currentOrganizationSubject.asObservable(),
  get currentOrganizationValue() {
    return currentOrganizationSubject.value;
  },
};

/*
 * Verify OTP method
 */
function verifyCredentials(payload: any) {
 


  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: defaultUsers[0] });
  //   resolve(true);
  // });

  return post("http://192.168.0.170:8080/auth/login", payload)
    .then((response: any) => {
      //   handleLogin(response)
      console.log(response.token)
      showSuccessToast(" 'You are successfully logged in'");
      handleLogin({ token: response.token, user: response.user });
      
      return response;
    })
    .catch((error: any) => {
      showErrorToast(
        error.message || "Error occurred while validating credentials!"
      );
      // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
      return error;
    });
}


//* Sent mail when forgot password
function forgotPassword(payload: any) {
    
  return post(
    "http://192.168.0.170:8080/auth/forgot-password",
    payload
  );
}
  
/*
 * Verify OTP method
 */
function requestPasswordReset(payload: any) {
  console.log(payload.obj)
  return post(
    `http://192.168.0.170:8080/auth/reset-password?token=${payload.token}`,payload.obj
  ).then((response: any) => {
    return response;
  });
}

/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
function logout() {
  return get(`/api/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out 

      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      // window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}

/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");

  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

/*
 * Get auth token from cookie
 */
function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method
 */
// function register(payload: any) {
//   return post("/api/user/sign-up", payload).then((response: any) => {
//     // handleLogin(response)
//     return response;
//   });
// }

function register(payload: any) {
  return post("http://192.168.0.170:8080/auth/register", payload)
   
}


/*
 * Set new password
 */
function setPassword(payload: any, token: string) {
  return put("/api/user/password", payload, {
    headers: { Authorization: `${token}`},
  }).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  get(`/api/auth/self`).then((response: any) => {

    localStorage.setItem("currentUser", JSON.stringify(response));
    currentUserSubject.next(response);
    currentOrganizationSubject.next(response._org[0]);

  });
}

/*
 * Register user method
 */
function handleLogin(response: any) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  Cookie.set("_token", response.token, { path: "/" });

  localStorage.setItem("currentUser", JSON.stringify(response.user));

  currentUserSubject.next(response.user);

  // currentOrganizationSubject.next(response.user._org[0]);

  if (response.user && !response.user._pre) {
    history.push(paths.home);
    window.location.reload();
  }
}


//* send verification mail

function sendVerification(payload: any) {
  console.log(payload)
  return post("http://192.168.0.170:8080/auth/send-verification-email",{}, {
    headers: {
      Authorization: "Bearer " + payload,
    },
  });
}

//* Add post 

function AddPost(payload: any) {
  

  return post(
    "http://localhost:8080/posts",
    {},
    {
      headers: {
        Authorization: Cookies.get("_token"),
      },
    }
  );
}

//get post in home

function getPosts() {
  return get(
    `http://192.168.0.170:8080/posts?page=1&limit=2`, {

    headers: { Authorization: "Bearer " +Cookies.get("_token") },
  });
}

// like the post

function like(id:any) {
  return patch(`http://192.168.0.170:8080/posts/like/${id}`, {
    headers: { Authorization: "Bearer " + Cookies.get("_token") },
  });
}

//comment on the post 
function addComment(id: any, comment: any) {
  

  return patch(`http://192.168.0.170:8080/posts/${id}/comment`, comment, {
    headers: { Authorization: "Bearer " + Cookies.get("_token") },
  });

}

//reply on comment
function replyToComment(id: any ,reply:any) {
  return patch(`http://192.168.0.170:8080/posts/comments/${id}/reply`, {reply:reply}, {
    headers: {Authorization : "Bearer " + Cookies.get("_token")}
  })

}
//like to comment
function likeToComment(id: any ,reply:any) {
  return patch(`http://192.168.0.170:8080/posts/comments/${id}/like`, {
    headers: {Authorization : "Bearer " + Cookies.get("_token")}
  })

}

//like to reply
function likeToReply(id: any, reply: any) {
  return patch(`http://192.168.0.170:8080/posts/comments/replies/${id}/like`, {
    headers: { Authorization: "Bearer " + Cookies.get("_token") },
  });
}