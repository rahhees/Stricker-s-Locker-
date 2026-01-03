import { useState } from "react";
import PasswordForm from "../Shared/PasswordForm";
import { toast } from "react-toastify";
import { authService } from "../../../Services/AuthService";

const ProfileSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""

  });

  const [loading,setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword) {
      toast.error("All Fields are Required");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return ;
    }

    if(passwordData.newPassword.length<8){
      toast.error("Pasword must be at least 8 characters");
      return ;
    }

    try {
      setLoading(true);

      const payload = {
    currentPassword: passwordData.currentPassword, 
    newPassword: passwordData.newPassword         
  };
      
        await authService.changePassword(
          payload);
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });

    } catch (err) {
      toast.error("There be errro",err);

      console.log("There be error is ",err)




    }finally{
      setLoading(false);
    }
  };


  return <PasswordForm passwordData={passwordData} setPasswordData={setPasswordData} onSubmit={handlePasswordUpdate} loading={loading} />;
};


export default ProfileSecurity;