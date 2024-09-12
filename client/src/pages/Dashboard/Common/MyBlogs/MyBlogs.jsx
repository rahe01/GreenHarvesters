import { useState } from "react";
import EmptyState from "../../../../components/Shared/EmptyState copy";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UpdateBlogModal from "./UpdateBlogModal";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import Breadcrumb from './../../../../components/Breadcrumb/Breadcrumb';
import { MdEditSquare } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from './../../../../components/Shared/Modal/ConfirmationModal';

const MyBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [selectedBlogData, setSelectedBlogData] = useState(null);

  const fetchBlogs = async () => {
    if (!user?.email) return [];
    const response = await axiosSecure.get(`/getblogbyuser/${user.email}`);
    return response.data;
  };

  // Query to fetch blogs
  const { data: blogs } = useQuery({
    queryKey: ["blogs", user?.email],
    queryFn: fetchBlogs,
    enabled: !!user?.email,
  });

  // Mutation to delete a blog
  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId) => {
      await axiosSecure.delete(`/blogdelet/${blogId}`);
    },
    onMutate: async (blogId) => {
      await queryClient.cancelQueries(["blogs", user?.email]);

      const previousBlogs = queryClient.getQueryData(["blogs", user?.email]);

      queryClient.setQueryData(["blogs", user?.email], (oldBlogs) =>
        oldBlogs.filter((blog) => blog._id !== blogId)
      );

      return { previousBlogs };
    },
    onError: (error, blogId, context) => {
      queryClient.setQueryData(["blogs", user?.email], context.previousBlogs);
      toast.error("Error deleting blog.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["blogs", user?.email]);
      toast.success("Blog deleted successfully!");
    },
  });

  const handleConfirm = async () => {
    if (currentAction === "delete") {
      deleteBlogMutation.mutate(selectedBlogId);
    } else if (currentAction === "update") {
      setIsUpdateModalOpen(true);
    }

    setIsModalOpen(false);
  };

  const openModal = (action, blogId, blogData) => {
    setCurrentAction(action);
    setSelectedBlogId(blogId);
    setSelectedBlogData(blogData || {}); // Ensure default empty object
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdateModalOpen(false); // Close update modal as well
    setCurrentAction(null);
    setSelectedBlogId(null);
    setSelectedBlogData(null);
  };

  return (
    <div className="p-4">
      <Breadcrumb pageName={"My Added Blogs"} />

      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg dark:bg-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0 w-full md:w-auto">
              <img
                src={blog.imgSrc}
                alt={blog.title}
                className="w-20 h-20 rounded-lg object-cover mr-4 mb-2 md:mb-0"
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {blog.category}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => openModal("update", blog._id, blog)}
                className="p-2 color1t hover:text-blue-800 transition-colors duration-300"
                aria-label="Update Blog"
              >
                <MdEditSquare size={20} />
              </button>
              <button
                onClick={() => openModal("delete", blog._id)}
                className="p-2 color1t hover:text-red-800 transition-colors duration-300"
                aria-label="Delete Blog"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <EmptyState label={"Add Blogs"} address={"/addBlogs"} message={"You have no blogs added yet."} />
      )}

      {/* Update Blog Modal */}
      {isUpdateModalOpen && selectedBlogData && (
        <UpdateBlogModal
          isOpen={isUpdateModalOpen}
          onClose={closeModal}
          blogData={selectedBlogData}
        />
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={closeModal} // Correctly close modal on cancel
          message={
            currentAction === "delete"
              ? "Are you sure you want to delete this blog?"
              : "Are you sure you want to update this blog?"
          }
          confirmButtonText={
            currentAction === "delete" ? "Delete" : "Update"
          }
        />
      )}
    </div>
  );
};

export default MyBlogs;
