import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import ConfirmationModal from "../../../../components/Shared/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import toast from 'react-hot-toast';

const MyBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    if (!user?.email) return [];
    const response = await axiosSecure.get(`/getblogbyuser/${user.email}`);
    return response.data;
  };

  // Query to fetch blogs
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', user?.email],
    queryFn: fetchBlogs,
    enabled: !!user?.email,
  });

  // Mutation to delete a blog
  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId) => {
      await axiosSecure.delete(`/blogdelet/${blogId}`);
    },
    onMutate: async (blogId) => {
      // Optimistically update the UI
      await queryClient.cancelQueries(['blogs', user?.email]);

      const previousBlogs = queryClient.getQueryData(['blogs', user?.email]);

      queryClient.setQueryData(['blogs', user?.email], (oldBlogs) =>
        oldBlogs.filter((blog) => blog._id !== blogId)
      );

      return { previousBlogs };
    },
    onError: (error, blogId, context) => {
      // Rollback in case of an error
      queryClient.setQueryData(['blogs', user?.email], context.previousBlogs);
      toast.error("Error deleting blog.");
    },
    onSettled: () => {
      // Refetch the query to ensure data consistency
      queryClient.invalidateQueries(['blogs', user?.email]);
      toast.success("Blog deleted successfully!");
    },
  });

  const handleConfirm = async () => {
    if (currentAction === "delete") {
      deleteBlogMutation.mutate(selectedBlogId);
    } else if (currentAction === "update") {
      navigate(`/update-blog/${selectedBlogId}`);
    }

    setIsModalOpen(false);
  };

  const openModal = (action, blogId) => {
    setCurrentAction(action);
    setSelectedBlogId(blogId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAction(null);
    setSelectedBlogId(null);
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Error loading blogs: {error.message}</p>;

  return (
    <div className="p-4">
      <Breadcrumb pageName={"My Added Blogs"} />

      {blogs.map((blog) => (
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
              onClick={() => openModal("update", blog._id)}
              className="p-2 color1t hover:text-blue-800 transition-colors duration-300"
              aria-label="Update Blog"
            >
              <MdEditSquare size={25} />
            </button>

            <button
              onClick={() => openModal("delete", blog._id)}
              className="p-2 text-red-600 hover:text-red-800 transition-colors duration-300"
              aria-label="Delete Blog"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to ${currentAction} this blog?`}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </div>
  );
};

export default MyBlogs;
