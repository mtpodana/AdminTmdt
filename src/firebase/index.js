import { initializeApp }  from "firebase/app"
import { getStorage, ref, uploadBytes }  from "firebase/storage"
import uuid  from "uuid-v4"

const firebaseConfig = {
  apiKey: "AIzaSyBAkrAddi_HFxIh62Lb3ZCZm1EUSet0OVw",
  authDomain: "tmdt-21.firebaseapp.com",
  projectId: "tmdt-21",
  storageBucket: "tmdt-21.appspot.com",
  messagingSenderId: "738217066387",
  appId: "1:738217066387:web:74b3dc9eb900299b2bb266",
  measurementId: "G-PL8HLNBVWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const uploadFile = async (idProduct,file,name) => {
  console.log(file);
  const storage = getStorage(app);
  // const filename = uuid.random();
  const fileRef = ref(storage, `${idProduct}/${name}`);

  await uploadBytes(fileRef, file)
  console.log("Upload ok!")
  return "ok"
};
export const storage = getStorage(app)
export default uploadFile