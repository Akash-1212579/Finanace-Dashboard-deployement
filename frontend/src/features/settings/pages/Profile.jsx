import { useState, useEffect } from "react";
import api from "../../transactions/pages/axiosInstance";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/profile");
        console.log("Profile response:", res.data);

        setProfileData(res.data);

      } catch (err) {
        console.log("Profile error:", err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profileData) return null;

  return (
    <div className="w-full p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Profile Information
            </h1>
            <p className="text-sm text-gray-500">
              View and manage your personal and bank details
            </p>
          </div>

          {/* <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition">
            Edit Profile
          </button> */}
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 grid md:grid-cols-2 gap-8">

          {/* User Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-emerald-600">
              User Details
            </h2>

            <ProfileRow label="Username" value={profileData?.userData?.name} />
            <ProfileRow label="Email" value={profileData?.userData?.email} />
          </div>

          {/* Bank Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-emerald-600">
              Bank Details
            </h2>

            <ProfileRow label="Bank Name" value={profileData?.bankData?.bankName} />
            <ProfileRow label="Account Number" value={profileData?.bankData?.accountNumber} />
            <ProfileRow
              label="Status"
              value={
                <span className="text-emerald-600 font-medium">
                  {profileData?.bankData?.status}
                </span>
              }
            />
          </div>

        </div>
      </div>
    </div>
  );
}

const ProfileRow = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
      {
        label == "Account Number"?
        <>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">
        **** **** {value || "-"}
      </span>
        </>:
        <>
        <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">
        {value || "-"}
      </span>
        </>
      }
      
    </div>
  );
};
