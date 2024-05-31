import React, { useState, useEffect, useRef } from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  update,
  get,
  remove,
  onValue,
} from "firebase/database";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [following, setFollowing] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("adcione uma bio");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Estatisticas");
  const [profileImg, setProfileImg] = useState("/anonimo.webp");
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("user");
  const fileInputRef = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalCategoriesCompleted, setTotalCategoriesCompleted] = useState();
  const [totalAcertos, setTotalAcertos] = useState(0);
  const [totalErros, setTotalErros] = useState(0);
  const [accuracyAverage, setAccuracyAverage] = useState(0);

  const { userId } = useParams();

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const id = auth.currentUser?.uid;
    if (id) {
      const userRef = ref(db, `users/${id}/totalPoints`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Total points from database:", data);
        if (data) {
          setTotalPoints(data);
        }
      });
    }
  }, [auth, db]);

  const checkFollowingStatus = async () => {
    try {
      const snapshot = await get(
        ref(db, `users/${auth.currentUser.uid}/following/${userId}`)
      );
      if (snapshot.exists()) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    } catch (error) {
      console.error("Erro ao verificar status de seguir:", error);
    }
  };

  const updateFollowersCount = async (userId, count) => {
    try {
      await update(ref(db, `users/${userId}`), { followersCount: count });
      setFollowersCount(count);
    } catch (error) {
      console.error("Erro ao atualizar o número de seguidores:", error);
    }
  };

  const updateFollowingCount = async (userId, count) => {
    try {
      await update(ref(db, `users/${userId}`), { followingCount: count });
    } catch (error) {
      console.error(
        "Erro ao atualizar o número de pessoas que o usuário segue:",
        error
      );
    }
  };

  const updateBioInDatabase = async (newBio) => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        await update(ref(db, `users/${userId}`), { bio: newBio });
        setBio(newBio);
      }
    } catch (error) {
      console.error("Erro ao atualizar biografia no banco de dados:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const snapshot = await get(ref(db, `users/${userId}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();

            if (userData.bio) {
              if (typeof userData.bio === "string") {
                setBio(userData.bio);
              }
            }

            if (userData.userName) {
              setNewUsername(userData.userName);
            }

            if (userData.profileImg) {
              setProfileImg(userData.profileImg);
            }

            if (userData.followersCount) {
              setFollowersCount(userData.followersCount);
            }

            if (userData.followingCount) {
              setFollowingCount(userData.followingCount);
            }

            if (userData.totalPoints) {
              setTotalPoints(userData.totalPoints);
            }

            if (userData.totalAcertos) {
              setTotalAcertos(userData.totalAcertos);
            }

            if (userData.totalErros) {
              setTotalErros(userData.totalErros);
            }

            if (userData.accuracyAverage) {
              setAccuracyAverage(userData.accuracyAverage);
            }

            if (userData.completedCategories) {
              const numberOfCompletedCategories = Object.keys(
                userData.completedCategories
              ).length;
              setTotalCategoriesCompleted(numberOfCompletedCategories);
            } else {
              setTotalCategoriesCompleted(0);
            }
          }
        }
      } catch (error) {
        console.error(
          "Erro ao buscar dados do usuário ao recarregar a página:",
          error
        );
      }
    };

    fetchUserData();

    const authStateChanged = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        fetchUserData();
        checkFollowingStatus();
      }
    });

    return () => authStateChanged();
  }, []);

  const handleSaveBio = async () => {
    try {
      await updateBioInDatabase(bio);
      setEditingBio(false);
    } catch (error) {
      console.error("Erro ao salvar biografia:", error);
    }
  };

  const toggleEditBio = () => {
    setBio(bio);
    setEditingBio((prevEditingBio) => !prevEditingBio);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setNewUsername(savedUsername);
    }
  }, []);

  const toggleChangePhotoModal = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    console.log("Remover foto de perfil");
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newProfileImgUrl = event.target.result;
        setProfileImg(newProfileImgUrl);
        updateUserProfileImg(newProfileImgUrl);
        console.log("Nova foto de perfil carregada:", newProfileImgUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfileImg = (newProfileImgUrl) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      update(ref(db, `users/${userId}`), { profileImg: newProfileImgUrl });
    }
  };

  const handleEditProfileImage = () => {
    fileInputRef.current.click();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleFollow = async () => {
    try {
      setFollowing((prevFollowing) => !prevFollowing);

      if (!following) {
        await updateFollowersCount(userId, followersCount + 1);
      } else {
        await updateFollowersCount(userId, followersCount - 1);
      }

      if (!following) {
        await updateFollowingCount(auth.currentUser.uid, followingCount + 1);
      } else {
        await updateFollowingCount(auth.currentUser.uid, followingCount - 1);
      }

      if (!following) {
        await update(
          ref(db, `users/${auth.currentUser.uid}/following/${userId}`),
          { following: true }
        );
      } else {
        await remove(
          ref(db, `users/${auth.currentUser.uid}/following/${userId}`)
        );
      }
    } catch (error) {
      console.error("Erro ao alternar seguir/deixar de seguir:", error);
    }
  };

  const toggleBioModal = () => {
    setBioModalOpen((prevBioModalOpen) => !prevBioModalOpen);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleEditUsername = () => {
    setEditUsername(true);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveUsername = () => {
    console.log("Novo nome de usuário:", newUsername);
    const userId = auth.currentUser?.uid;
    if (userId) {
      update(ref(db, `users/${userId}`), { userName: newUsername });
    }
    setEditUsername(false);
  };

  return (
    <UserProfile
      accuracyAverage={accuracyAverage}
      totalErros={totalErros}
      totalAcertos={totalAcertos}
      totalCategoriesCompleted={totalCategoriesCompleted}
      totalPoints={totalPoints}
      followersCount={followersCount}
      followingCount={followingCount}
      following={following}
      bioModalOpen={bioModalOpen}
      editingBio={editingBio}
      bio={bio}
      dropdownOpen={dropdownOpen}
      activeTab={activeTab}
      profileImg={profileImg}
      editUsername={editUsername}
      newUsername={newUsername}
      fileInputRef={fileInputRef}
      updateBioInDatabase={updateBioInDatabase}
      handleSaveBio={handleSaveBio}
      toggleEditBio={toggleEditBio}
      toggleChangePhotoModal={toggleChangePhotoModal}
      handleRemovePhoto={handleRemovePhoto}
      handleUploadPhoto={handleUploadPhoto}
      updateUserProfileImg={updateUserProfileImg}
      handleEditProfileImage={handleEditProfileImage}
      toggleDropdown={toggleDropdown}
      toggleFollow={toggleFollow}
      toggleBioModal={toggleBioModal}
      handleBioChange={handleBioChange}
      handleTabChange={handleTabChange}
      handleEditUsername={handleEditUsername}
      handleUsernameChange={handleUsernameChange}
      handleSaveUsername={handleSaveUsername}
      userId={userId}
    />
  );
};

export default Profile;
