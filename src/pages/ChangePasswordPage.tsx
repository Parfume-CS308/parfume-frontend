import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/changePassword";
import "./style.css";

const ChangePasswordPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== reEnterNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword });
      setSuccess("Password updated successfully.");
      setError(null);
      setTimeout(() => navigate("/account"), 2000);
    } catch {
      setError("Failed to update password. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Change Password</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Re-enter New Password:</label>
          <input
            type="password"
            value={reEnterNewPassword}
            onChange={(e) => setReEnterNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
