import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  getDatabase,
  ref,
  orderByChild,
  limitToLast,
  onValue,
  off,
  query,
} from "firebase/database";
import { useTopUsers } from "../../hook/TopUsersContext";
import "./RankUser.css";

const RankUser = () => {
  const { topUsers, setTopUsers } = useTopUsers();

  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "users");

    const topUsersQuery = query(
      userRef,
      orderByChild("totalPoints"),
      limitToLast(3)
    );

    console.log("Top Users Query:", topUsersQuery);

    onValue(topUsersQuery, (snapshot) => {
      const data = snapshot.val();
      console.log("Top Users Data:", data);
      if (data) {
        const usersArray = Object.keys(data).map((key) => {
          const user = data[key];
          return {
            id: key,
            totalPoints: user.totalPoints,
            userName: user.userName,
            profileImg: user.profileImg,
          };
        });
        console.log("Top Users Array:", usersArray);

        const sortedUsers = usersArray.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );
        console.log("Sorted Top Users:", sortedUsers);

        setTopUsers(sortedUsers.reverse());
      } else {
        setTopUsers([]);
      }
    });

    const otherUsersQuery = query(
      userRef,
      orderByChild("totalPoints"),
      limitToLast(100)
    );

    console.log("Other Users Query:", otherUsersQuery);

    onValue(otherUsersQuery, (snapshot) => {
      const data = snapshot.val();
      console.log("Other Users Data:", data);
      if (data) {
        const usersArray = Object.keys(data).map((key) => {
          const user = data[key];
          return {
            id: key,
            userName: user.userName,
            profileImg: user.profileImg,
            totalPoints: user.totalPoints,
          };
        });
        console.log("Other Users Array:", usersArray);

        const sortedUsers = usersArray.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );
        console.log("Sorted Other Users:", sortedUsers);

        setOtherUsers(sortedUsers.slice(3));
      } else {
        setOtherUsers([]);
      }
    });

    return () => {
      off(topUsersQuery);
      off(otherUsersQuery);
    };
  }, [setTopUsers]);

  return (
    <div className="rank-user-container">
      <div className="rank-top">
        <div className="rank-header">
          <Link to="/home">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h2>Ranking</h2>
        </div>
      </div>
      <div className="rank-best-users">
        {topUsers[1] && (
          <div className="best-user">
            <Link to={`/profile/${topUsers[1].id}`}>
              <img
                src={topUsers[1].profileImg}
                alt={`Avatar de ${topUsers[1].userName}`}
              />
            </Link>
            <div className="user-details">
              <p className="rank-best-name">{topUsers[1].userName}</p>
              <p className="rank-best-score">
                Pontuação: {topUsers[1].totalPoints}
              </p>
            </div>
          </div>
        )}

        {topUsers[2] && (
          <div className="best-user">
            <Link to={`/profile/${topUsers[2].id}`}>
              <img
                src={topUsers[2].profileImg}
                alt={`Avatar de ${topUsers[2].userName}`}
              />
            </Link>
            <div className="user-details">
              <p className="rank-best-name">{topUsers[2].userName}</p>
              <p className="rank-best-score">
                Pontuação: {topUsers[2].totalPoints}
              </p>
            </div>
          </div>
        )}

        {topUsers[0] && (
          <div className="best-user">
            <Link to={`/profile/${topUsers[0].id}`}>
              <img
                src={topUsers[0].profileImg}
                alt={`Avatar de ${topUsers[0].userName}`}
              />
            </Link>
            <div className="user-details">
              <p className="rank-best-name">{topUsers[0].userName}</p>
              <p className="rank-best-score">
                Pontuação: {topUsers[0].totalPoints}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rank-list-users">
        {otherUsers.map((user, index) => (
          <div key={user.id} className="rank-user-item">
            <span className="number-rank">{index + 4}</span>
            <Link to={`/profile/${user.id}`}>
              <img src={user.profileImg} alt={`Avatar de ${user.userName}`} />
            </Link>
            <p className="rank-name">{user.userName}</p>
            <p className="rank-score">Pontuação: {user.totalPoints}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankUser;
