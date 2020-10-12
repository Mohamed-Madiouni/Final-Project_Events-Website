import React,{useState} from 'react'
import Picker from 'emoji-picker-react';

function AddComment() {
    const [chosenEmoji, setChosenEmoji] = useState("");
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(chosenEmoji.concat(emojiObject.emoji));
        console.log(chosenEmoji)
      };

      onsubmit=(e)=>{
          e.preventDefault()
          console.log(chosenEmoji)
      }
    return (
        <div>
            <div>
      {chosenEmoji ? (
          <form onSubmit={onsubmit}>
              <input value={chosenEmoji} onChange={(e)=>setChosenEmoji(e.target.value)}/> 
          <button type="submit">submit</button>
          </form>
        
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
        </div>
    )
}

export default AddComment
