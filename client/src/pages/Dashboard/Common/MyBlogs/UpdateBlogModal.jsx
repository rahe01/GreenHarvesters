import { useState, useEffect } from "react";
import { Input, Select, Option, Button, Textarea } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateBlogModal = ({ isOpen, onClose, blogData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setDescription(blogData.description || "");
      setImageUrl(blogData.imgSrc || "");
      setCategory(blogData.category || "");
    }
  }, [blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageUrl || !category) {
      toast.error("All fields are required.");
      return;
    }

    const updatedBlogData = {
      title,
      description,
      imgSrc: imageUrl,
      category,
    };

    try {
      const response = await axiosSecure.put(`/updateblog/${blogData._id}`, updatedBlogData);
      if (response.status === 200) {
        toast.success("Blog updated successfully");
        onClose(); // Close modal on successful update
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167]"
              required
            />
          </div>
          <div>
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167]"
              required
            />
          </div>
          <div>
            <Input
              label="Image URL"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="focus:ring-2 focus:ring-[#8AD167]"
              required
            />
          </div>
          <div>
            <Select
              label="Category"
              value={category}
              onChange={(value) => setCategory(value)}
              className="focus:ring-2 focus:ring-[#8AD167]"
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
          <div className="flex justify-between">
            <Button type="button" color="gray" onClick={onClose}>Cancel</Button>
            <Button type="submit" color="green">Update Blog</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogModal;
