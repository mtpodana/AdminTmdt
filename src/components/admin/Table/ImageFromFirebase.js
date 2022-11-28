import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../../firebase";

function ImageFromFireBase({id}) {
    const [imgUrl, setImgUrl] = useState(null)

    const getUrlFromFirebase = async () => {
        const res = await listAll(ref(storage, `${id}`));
        console.log(`Id = ${id}`, res.items);
        const imgRef = res.items[0];
        const url = await getDownloadURL(imgRef);
        setImgUrl(url)
      };

    useEffect(()=>{
        getUrlFromFirebase()
        // console.log(id);
    },[id])
  return <img  style={{ width: "70px" }} src={imgUrl}></img>;
}

export default ImageFromFireBase;
