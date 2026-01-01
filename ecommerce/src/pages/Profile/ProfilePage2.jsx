import { useState } from "react";
import {useProfile} from "./Hooks/UserProfile";
import ProfileSidebar from "./Sidebar/ProfileSidebar";
import ProfileInfoEdit from "./Sections/ProfileInfoEdit";
import ProfileInfoView from "./Sections/ProfileInfoView";
import ProfileSecurity from "./Sections/ProfileSecurity";
import ProfileNotifications from "./Sections/ProfileNotifications";
import ProfileLoader from "./Shared/ProfileLoader";
import PageLayout from "./Layout/PageLayout";

const ProfilePage2 = () => {
  const { user, setUser, isLoading } = useProfile();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <ProfileLoader />;
  if (!user) return null;

  return (
    <PageLayout>
      {/* Left Sidebar */}
      <ProfileSidebar
        user={user}
        setUser={setUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Right Main Content - Remove the extra div wrappers */}
      <div className="lg:col-span-3">
        {activeTab === "profile" && (
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            {isEditing ? (
              <ProfileInfoEdit
                user={user}
                setUser={setUser}
                onCancel={() => setIsEditing(false)}
                onSaved={() => setIsEditing(false)}
              />
            ) : (
              <ProfileInfoView
                user={user}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        )}
        
        {activeTab === "security" && (
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            <ProfileSecurity />
          </div>
        )}
        
        {activeTab === "notifications" && (
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            <ProfileNotifications />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProfilePage2;