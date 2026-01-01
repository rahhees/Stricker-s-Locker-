import { toast } from "react-toastify";
import EditForm from "../Shared/EditForm";
import SaveCancelButtons from "../Shared/SaveCancelButtons";

const ProfileInfoEdit = ({ user, setUser, onCancel }) => {
const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append("FirstName", user.firstName);
    formData.append("LastName", user.lastName);
    formData.append("Email", user.email);
    formData.append("Phone", user.phone || "");
    formData.append("Address", user.address || "");

    await api.put("/users/profile-update", formData);
      
    toast.success("Profile updated successfully");
    setIsEditing(false);

    const res = await api.get("/users/profile");
    setUser(res.data);

  } catch (err) {
    console.error("Update Failed",err.response?.data)
    toast.error(err.response?.data?.message || "Profile update failed");
  }
};


  return (
    <>
      <EditForm user={user} setUser={setUser} />
      <SaveCancelButtons onSave={handleSave} onCancel={onCancel} />
    </>
  );
};


export default ProfileInfoEdit;