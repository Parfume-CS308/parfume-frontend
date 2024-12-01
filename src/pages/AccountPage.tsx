import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/userService";
import "./style.css";

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AccountPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch {
        setError("Failed to fetch user information. Please try again.");
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="account-container">
      <h1 className="account-title">Account Details</h1>
      {userInfo ? (
        <div className="account-details">
          <p>
            <strong>ID:</strong> {userInfo.id}
          </p>
          <p>
            <strong>First Name:</strong> {userInfo.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <button
            onClick={() => navigate("/account/edit")}
            className="primary-button"
          >
            Edit Account Information
          </button>
        </div>
      ) : (
        <p className="loading-message">Loading account details...</p>
      )}
    </div>
  );
};

export default AccountPage;
