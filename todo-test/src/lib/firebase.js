// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9iwMavto87u2z29f86sAT0EAGNnrirtg",
  authDomain: "session15a.firebaseapp.com",
  projectId: "session15a",
  storageBucket: "session15a.firebasestorage.app",
  messagingSenderId: "119577579610",
  appId: "1:119577579610:web:d6269870b3607c80e2c863",
  measurementId: "G-YF2L3M3KG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 새로운 할 일을 Firestore에 추가하는 함수
async function addTodo(todo) {
  try {
    const docRef = await addDoc(collection(db, "todos"), todo);
    console.log("할 일이 추가되었습니다. ID:", docRef.id);
  } catch (e) {
    console.error("에러 발생:", e);
  }
}

// ✅ 전체 할 일 불러오기 함수
async function getTodos() {
  try {
    const q = query(collection(db, "todos"), orderBy("due", "asc")); // 마감일 기준 정렬
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.error("할 일 불러오기 실패:", e);
    return [];
  }
}

async function updateTodo(id, updatedData) {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, updatedData);
    console.log("할 일이 수정되었습니다.");
  } catch (e) {
    console.error("수정 중 에러:", e);
  }
}

async function deleteTodo(id) {
  try {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    console.log("할 일이 삭제되었습니다.");
  } catch (e) {
    console.error("삭제 중 에러:", e);
  }
}


export { db, addTodo, getTodos, updateTodo, deleteTodo };
