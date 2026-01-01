import Avatar from "../Shared/Avatar";

const ProfileAvatar = ({ user,setUser }) => {
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image size should be less than 5MB");
    return;
  }

  try {
    const formData = new FormData();
   formData.append("Image", file);
  formData.append("FirstName", user.firstName);
  formData.append("LastName", user.lastName);
  formData.append("Email", user.email);
  formData.append("Phone", user.phone || "");
  formData.append("Address", user.address || "");


    await api.put("/users/profile-update", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    toast.success("Profile image updated");

    
    const res = await api.get("/users/profile");
    setUser(res.data);

  } catch (err) {
    toast.error(err.response?.data?.message || "Image upload failed");
  }
};

  return (
    <Avatar
      image={user.image}
      onChange={handleImageChange}
    />
  );
};

export default ProfileAvatar;