import "./index.css";
import { NAMES, COMMENTS, ICONS } from "./data.js";
import { useEffect, useState, useRef } from "react";

const MAX_COMMENT_LIMIT = 30;

const getRandomValue = (type) => {
  let targetArr = null;
  switch (type) {
    case "name": {
      targetArr = NAMES;
      break;
    }
    case "comment": {
      targetArr = COMMENTS;
      break;
    }
    case "icon": {
      targetArr = ICONS;
      break;
    }
    default: {
      targetArr = [];
      break;
    }
  }
  const randomIdx = Math.floor(Math.random() * targetArr.length);
  return targetArr[randomIdx];
};

const fetchComments = async () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const name = getRandomValue("name");
    const comment = getRandomValue("comment");
    const icon = getRandomValue("icon");
    result.push({
      id: crypto.randomUUID(),
      authorName: name,
      authorIcon: icon,
      authorComment: comment,
    });
  }

  // dummt wait
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 2000);
  });

  return result;
};

export default function App() {
  return <YoutubeLiveChat />;
}

function YoutubeLiveChat() {
  return (
    <div className="parent-container">
      <div className="video-el">
        <img
          src="https://i.pinimg.com/originals/f9/47/74/f94774094cdb0632c80e94a27d4de239.gif"
          alt="nature-gif"
        />
      </div>
      <ChatUI />
    </div>
  );
}

function ChatUI() {
  const [uiDataList, setUiDataList] = useState(null);
  const inputRef = useRef(null);
  const intervalId = useRef(null);
  const isFetching = useRef(false);
  const apiDataList = useRef(null);

  useEffect(() => {
    const fetchInitialComments = async () => {
      if (isFetching.current === true) return;
      isFetching.current = true;
      apiDataList.current = await fetchComments();
      setUiDataList([apiDataList.current[0]]);
      intervalId.current = setInterval(() => {
        setUiDataList((prev) => {
          if (apiDataList.current[0]) {
            const result = [apiDataList.current[0], ...prev];
            return result.splice(0, MAX_COMMENT_LIMIT);
          } else return prev;
        });
        apiDataList.current = apiDataList.current.slice(1);
      }, 1800);
      isFetching.current = false;
    };
    fetchInitialComments();

    return () => {
      if (intervalId?.current) clearInterval(intervalId?.current);
    };
  }, []);

  useEffect(() => {
    const fetchNextSetOfComments = async () => {
      if (apiDataList.current?.length < 10 && isFetching.current === false) {
        isFetching.current = true;
        const res = await fetchComments();
        apiDataList.current = [...apiDataList.current, ...res];
        isFetching.current = false;
      }
    };

    fetchNextSetOfComments();
  }, [apiDataList.current?.length]);

  const submitComment = () => {
    if (inputRef.current.value) {
      const name = "Shubham Gupta";
      const icon =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s";
      const comment = inputRef.current.value;
      const id = crypto.randomUUID();
      setUiDataList((prev) => {
        const result = [
          {
            id,
            authorName: name,
            authorIcon: icon,
            authorComment: comment,
          },
          ...prev,
        ];
        return result.splice(0, MAX_COMMENT_LIMIT);
      });

      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitComment();
    }
  };

  return (
    <div className="chat-el" onKeyDown={handleKeyDown}>
      <div className="chat-stack">
        {uiDataList?.length > 0 &&
          uiDataList.map((commentObj) => (
            <div key={commentObj.id} className="chat-box">
              <img
                className="author-img"
                src={commentObj.authorIcon}
                alt={commentObj.authorName}
              />
              <div className="author-container">
                <p className="author-name">{commentObj.authorName}</p>
                <p className="author-comment">{commentObj.authorComment}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="input-container">
        <input ref={inputRef} type="text" />
        <img
          className="send-img"
          src="https://cdn-icons-png.flaticon.com/512/4008/4008617.png"
          alt="send icon"
          onClick={submitComment}
        />
      </div>
    </div>
  );
}

/*

Requirements:
1. chat UI - input anything, it enters the last of array
2. scrolls to bottommost entry everytime
3. after every 2 secs, you hit the API and fetch next batch of chat elements and display

API data list - [3,4,5]
as length less than 4, hit again and update.

UI data list - [1, 2]
after every second, add one more in data list and make sure

API hit - 2 secs wait - 5 enteries
display 1 new after 1 sec - 5 secs

1. initial render, inital API call and then add 1 entry in UI data list and setInterval, to be cleaned on unmount
2. setInterval
    - add 1 new entry after each second + limit length of list to 30 elements
3. useEffect on length change of API data list.
  - fetch again when list length < 5 + have only 1 active request
4. if user inputs his own entry, add UI list then and there and clean input fields

*/
