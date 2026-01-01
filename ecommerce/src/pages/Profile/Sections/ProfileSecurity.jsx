import { useState } from "react";
import PasswordForm from "../Shared/PasswordForm";
import { toast } from "react-toastify";

const ProfileSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""

  });

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword) {
      toast.error("All Fields are Required");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords Do Not Match");
    }

    try {
      await api.put("/users/profile-update", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });

    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    }
  };


  return <PasswordForm passwordData={passwordData} setPasswordData={setPasswordData} onSubmit={handlePasswordUpdate} />;
};


export default ProfileSecurity;