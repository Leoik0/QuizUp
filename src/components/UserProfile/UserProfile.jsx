import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";
import { MdPhotoCamera, MdEdit } from "react-icons/md";
import "./UserProfile.css";
import Estatisticas from "../Estatisticas/Estatisticas";
import { getAuth } from "firebase/auth";

const UserProfile = ({
  accuracyAverage,
  totalErros,
  totalAcertos,
  totalCategoriesCompleted,
  totalPoints,
  userId,
  following,
  followersCount,
  followingCount,
  bioModalOpen,
  editingBio,
  bio,
  dropdownOpen,
  activeTab,
  profileImg,
  editUsername,
  newUsername,
  fileInputRef,
  updateBioInDatabase,
  handleSaveBio,
  toggleEditBio,
  toggleChangePhotoModal,
  handleRemovePhoto,
  handleUploadPhoto,
  updateUserProfileImg,
  handleEditProfileImage,
  toggleDropdown,
  toggleFollow,
  toggleBioModal,
  handleBioChange,
  handleTabChange,
  handleEditUsername,
  handleUsernameChange,
  handleSaveUsername,
}) => {
  const auth = getAuth();
  return (
    <div className="user-profile">
      <div>
        <div className="top-bar">
          <Link to="/home">
            <FaArrowLeft className="back-icon" />
          </Link>
        </div>
        <div className="profile-details">
          <div className="profile-image">
            <img src={profileImg} alt="User Profile" />
            <span className="edit-img" onClick={handleEditProfileImage}>
              <MdPhotoCamera />
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleUploadPhoto}
            />
          </div>

          {editUsername ? (
            <input
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
              onBlur={handleSaveUsername}
              autoFocus
            />
          ) : (
            <div className="name">
              <h4>{newUsername}</h4>
              <span className="edit-name" onClick={handleEditUsername}>
                <MdEdit />
              </span>
            </div>
          )}

          {auth.currentUser && auth.currentUser.uid !== userId && (
            <button onClick={toggleFollow}>
              {following ? "Seguindo" : "Seguir"}
            </button>
          )}
        </div>
        <div className="user-stats">
          <div className="status">
            <span>500</span>
            <span>Popularidade</span>
          </div>
          <div className="status">
            <span>{followersCount}</span>
            <span>Seguidores</span>
          </div>
          <div className="status">
            <span>{followingCount}</span>
            <span>Seguindo</span>
          </div>
        </div>
      </div>

      <div className="bio">
        <h4>biografia</h4>
        <p
          onClick={
            auth.currentUser && auth.currentUser.uid === auth.currentUser.uid
              ? toggleEditBio
              : toggleBioModal
          }
        >
          {bio.length > 0 ? bio.substring(0, 100) : bio}
        </p>

        {editingBio && (
          <div className="edit-bio">
            <textarea value={bio} onChange={handleBioChange}></textarea>
            <button onClick={handleSaveBio}>Salvar</button>
          </div>
        )}
        {bioModalOpen && (
          <div className="modal">
            <p>{bio}</p>

            {auth.currentUser &&
              auth.currentUser.uid === auth.currentUser.uid && (
                <button onClick={toggleEditBio}>Editar Biografia</button>
              )}
          </div>
        )}
      </div>
      <div className="tabBar">
        <button
          onClick={() => handleTabChange("Estatisticas")}
          className={activeTab === "Estatisticas" ? "active" : ""}
        >
          Estatisticas
        </button>
      </div>
      <div className="tab">
        <Estatisticas
          totalCategoriesCompleted={totalCategoriesCompleted}
          totalPoints={totalPoints}
          totalErros={totalErros}
          totalAcertos={totalAcertos}
          accuracyAverage={accuracyAverage}
        />
      </div>
    </div>
  );
};

export default UserProfile;
