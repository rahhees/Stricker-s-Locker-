const ProfileStats = () => {
  return (
    <div className="mt-6 bg-gray-800 rounded-lg p-4 text-sm text-gray-300">
      <div className="flex justify-between">
        <span>Orders</span>
        <span className="font-semibold">12</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Wishlist</span>
        <span className="font-semibold">5</span>
      </div>
    </div>
  );
};

export default ProfileStats;
