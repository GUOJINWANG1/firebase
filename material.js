import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// Firebase 配置
const firebaseConfig = {
   apiKey: "AIzaSyDACgpDZcWXmQVvm13OxXxdBGrwISJWqEo",
   authDomain: "materials-420d0.firebaseapp.com",
   databaseURL: "https://materials-420d0-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "materials-420d0",
   storageBucket: "materials-420d0.appspot.com",
   messagingSenderId: "1023899248303",
   appId: "1:1023899248303:web:d712f818c1aec95857165a",
   measurementId: "G-JPR2F15NS1"
};
// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
// 监听用户状态变化
onAuthStateChanged(auth, (user) => {
   if (user) {
       console.log('User is signed in:', user);
       document.getElementById('logoutBtn').style.display = 'block'; // 显示登出按钮
       document.getElementById('loginBtn').style.display = 'none'; // 隐藏登录按钮
   } else {
       console.log('No user is signed in.');
       document.getElementById('logoutBtn').style.display = 'none'; // 隐藏登出按钮
       document.getElementById('loginBtn').style.display = 'block'; // 显示登录按钮
   }
});
// 登录按钮事件
document.getElementById('loginBtn').addEventListener('click', () => {
   signInAnonymously(auth)
       .then((userCredential) => {
           // 登录成功
           const user = userCredential.user;
           console.log('Logged in as:', user.uid);
           saveData(user.uid, { username: 'Anonymous', email: 'anonymous@example.com' });
       })
       .catch((error) => {
           console.error('Login failed:', error);
       });
});
// 登出按钮事件
document.getElementById('logoutBtn').addEventListener('click', () => {
   signOut(auth).then(() => {
       console.log('User signed out.');
   });
});
// 存储数据的函数
function saveData(userId, data) {
   set(ref(database, 'users/' + userId), {
       username: data.username,
       email: data.email,
   });
}