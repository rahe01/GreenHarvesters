import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Select, Option } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle role update for a specific user
  const handleRoleUpdate = async (userId) => {
    if (!selectedRole[userId]) {
      toast.error("Please select a new role for this user");
      return;
    }

    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, {
        role: selectedRole[userId],
      });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: selectedRole[userId] } : user
          )
        );
        toast.success("Role updated successfully");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  return (
   <div>
    <Breadcrumb pageName={"Manage Users"}></Breadcrumb>
     <div className="p-4 sm:p-6 max-w-full md:max-w-5xl mx-auto bg-white dark:bg-blue-gray-500 dark:text-white shadow-lg rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
        Manage Users
      </h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0"
          >
            <div className="w-full sm:w-auto">
              <p className="font-medium">Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Status: {user.status}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Role selector */}
              <Select
                label="Update Role"
                value={selectedRole[user._id] || ""}
                onChange={(value) =>
                  setSelectedRole((prev) => ({ ...prev, [user._id]: value }))
                }
                className="w-full sm:w-40"
                disabled={user.email === "raheahmed009@gmail.com"} 
              >
                <Option value="Farmer">Farmer</Option>
                <Option value="Admin">Admin</Option>
                <Option value="Seller">Seller</Option>
              </Select>

              {/* Update Role Button */}
              <Button
                onClick={() => handleRoleUpdate(user._id)}
                disabled={user.email === "raheahmed009@gmail.com"} 
                className="w-full sm:w-auto px-4 py-2 text-black font-semibold rounded-3xl color1b"
              >
                Update Role
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default ManageUsers;
