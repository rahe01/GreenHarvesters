import { useState } from "react";
import { Input, Select, Option, Button, Textarea } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Title from "../../../components/Shared/Title/Title";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  // Destructure user information with fallback for undefined user
  const { email, displayName: name, photoURL: userImageUrl } = user || {};

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!title || !description || !imageUrl || !category) {
      toast.error("All fields are required.");
      return;
    }

    // Construct the blog object with user details
    const blogData = {
      title,
      description,
      imgSrc: imageUrl,
      category,
      userEmail: email,
      userName: name,
      userImage: userImageUrl,
    };

    try {
      console.log("Sending blog data:", blogData);
      const response = await axiosSecure.post("/addblogs", blogData);

      if (response.status === 201) {
        console.log("Blog added successfully:", response.data);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCategory("");
        toast.success("Blog added successfully");
        navigate('/blogs');
      } else {
        console.error("Failed to add blog:", response.data);
        toast.error("Failed to add blog");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while adding the blog");
    }
  };

  return (
    <div>
      {/* Conditionally render Title or Breadcrumb based on the current route */}
      {location.pathname === "/dashboard/addBlogs" ? (
        <Breadcrumb pageName="Add Blogs" />
      ) : (
        <Title title="Add New Blog" />
      )}
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167] transition-all duration-300 ease-in-out"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167] transition-all duration-300 ease-in-out"
              required
            />
          </div>

          {/* Image URL Input */}
          <div>
            <Input
              label="Image URL"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167] transition-all duration-300 ease-in-out"
              required
            />
          </div>

          {/* Category Selector */}
          <div>
            <Select
              label="Category"
              value={category}
              onChange={(value) => setCategory(value)}
              className="focus:ring-2 focus:ring-[#8AD167] transition-all duration-300 ease-in-out"
              required
            >
              <Option value="">Select a Category</Option>
              <Option value="Crops">Crops</Option>
              <Option value="Farming Techniques">Farming Techniques</Option>
              <Option value="Livestock">Livestock</Option>
              <Option value="Pest and Disease Management">Pest and Disease Management</Option>
              <Option value="Soil and Fertilizers">Soil and Fertilizers</Option>
              <Option value="Technology and Equipment">Technology and Equipment</Option>
              <Option value="Market and Economics">Market and Economics</Option>
              <Option value="Sustainability">Sustainability</Option>
              <Option value="Education and Resources">Education and Resources</Option>
              <Option value="Events and News">Events and News</Option>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              color="green"
              className="relative px-6 py-3 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <span className="absolute inset-0 bg-[#8AD167] rounded-full opacity-30"></span>
              <span className="relative">Add Blog</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
