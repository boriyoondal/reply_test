// src/components/CommentSection.js
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  firebase,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import choo from "../image/hbd.png";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2023-08-21T00:00:00"); // 목표 날짜

    const updateCountdown = () => {
      const now = new Date();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown(); // 초기 설정
    const interval = setInterval(updateCountdown, 1000); // 매 초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 unmount 시 타이머 해제
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const addComment = async () => {
    try {
      await addDoc(collection(db, "comments"), {
        text: comment,
        nickname: nickname, // Firestore에 닉네임도 저장
        timestamp: serverTimestamp(),
      });

      setComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      <img src={choo} alt="추" />

      <h1>온 지구가 당신의 셍일을 축하합니다!</h1>
      <h2>
        추이생일 {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{" "}
        {timeLeft.seconds}초 남았습니다.
      </h2>
      <div>
        <input
          type="text"
          value={nickname}
          className="input"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임입력ㄱㄱ" // 닉네임 입력 필드
        />
        <textarea
          value={comment}
          className="textarea"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="button" onClick={addComment}>
          등록
        </button>
      </div>
      <strong>댓글목록</strong>
      <div className=" w-full">
        {comments.map((comment, index) => (
          <div key={index} className="comment-row">
            {/* 닉네임 표시 */}
            <strong className="commentform">
              닉넴:
              {comment?.nickname?.length === 0
                ? "닉넴등록안함"
                : comment.nickname}
              :
            </strong>
            <p className="commentform">댓글: {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
