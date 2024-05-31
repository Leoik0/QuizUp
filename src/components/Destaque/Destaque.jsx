import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue,
  off,
} from "firebase/database";
import { Link } from "react-router-dom";
import "./Destaque.css";

const Destaque = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "users");

    const topUsersQuery = query(
      userRef,
      orderByChild("totalPoints"),
      limitToLast(3)
    );

    onValue(topUsersQuery, (snapshot) => {
      const data = snapshot.val();
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
        setTopUsers(usersArray);
      } else {
        setTopUsers([]);
      }
    });

    return () => {
      off(topUsersQuery);
    };
  }, []);

  return (
    <div className="destaque">
      <h2>Top 3 Usuários</h2>
      <div className="best-users-container">
        {topUsers.map((user) => (
          <div key={user.id} className="best-user">
            <Link to={`/profile/${user.id}`}>
              <img
                className="profile-img"
                src={user.profileImg}
                alt={`Avatar de ${user.userName}`}
              />
            </Link>
            <div className="user-details">
              <p className="rank-best-name">{user.userName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destaque;
