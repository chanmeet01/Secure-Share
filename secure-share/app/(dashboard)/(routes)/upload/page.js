"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Upload() {
  const [fileDocId, setFileDocId] = useState();
  const [uploadCompleted, setUploadCompleted] = useState(false); // State to track upload completion
  const [progress, setProgress] = useState(null); // Initialize progress state

  const router = useRouter();
  const { user } = useUser();

  const storage = getStorage(app);
  const db = getFirestore(app);

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };

    const storageRef = ref(storage, "file-upload/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + uploadProgress + "% done");
        setProgress(uploadProgress);

        if (uploadProgress === 100) {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            saveInfo(file, downloadURL);
          });
        }
      },
      (error) => {
        console.error("Upload failed", error);
        setProgress(null);
      }
    );
  };

  const saveInfo = async (file, downloadURL) => {
    const docId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: downloadURL,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId
    });
    setFileDocId(docId);
    setUploadCompleted(true); // Mark upload as complete
  };

  useEffect(() => {
    if (uploadCompleted) {
      setTimeout(() => {
        setUploadCompleted(false);
        router.push('/file-preview/' + fileDocId);
      }, 2000);
    }
  }, [uploadCompleted, fileDocId, router]);

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start
        <strong className="text-primary"> Uploading </strong>
        Files and <strong className="text-primary">Share</strong> it
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
      {uploadCompleted && (
        <p className="text-green-500 text-center mt-4">Uploaded successfully!</p>
      )}
    </div>
  );
}

export default Upload;
