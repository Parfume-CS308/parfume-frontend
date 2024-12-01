import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface UserInfo {
  firstName: string;
  lastName: string;
}

const EditAccountPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch {
        setError("Failed to fetch user information. Please try again.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUserInfo(userInfo);
      setSuccess("Information updated successfully.");
      setError(null);
    } catch {
      setError("Failed to update information. Please try again.");
      setSuccess(null);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Edit Account</h1>
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="primary-button">
          Update Information
        </button>
      </form>
      <button
        onClick={() => navigate("/account/change-password")}
        className="secondary-button"
      >
        Change Password
      </button>
    </div>
  );
};

export default EditAccountPage;
