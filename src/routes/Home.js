import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

export default function Home() {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      console.log(docRef);
      setNweet("");
    } catch (error) {
      console.error("####Error Message: ", error);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="무슨생각중?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </>
  );
}
