import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export default function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 삭제하겠습니까?");
    if (ok) {
      // delete
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(dbService, `nweets/${nweetObj.id}`);
    await updateDoc(docRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (e) => setNewNweet(e.target.value);
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              {" "}
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
