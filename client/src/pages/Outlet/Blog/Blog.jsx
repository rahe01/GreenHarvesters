import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../../components/Shared/Button/Button";

const Blog = () => {
  // Get the blog data from the loader
  const blog = useLoaderData();
  const navigate = useNavigate();

  // Ensure blog data is available before rendering
  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
      <article className="space-y-4">
        <header className="relative mb-6">
          <img
            src={blog.imgSrc}
            alt={blog.title}
            className="object-cover w-full h-96 rounded dark:bg-gray-500"
          />
          <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-transparent to-gray-800">
            <div className="flex items-center justify-between text-white">
              <span className="text-xs font-semibold tracking-wider uppercase">
                {blog.category}
              </span>
              <div className="text-center">
                <span className="text-3xl font-semibold">
                  {new Date(blog.date).getDate()}
                </span>
                <span className="block text-sm uppercase">
                  {new Date(blog.date).toLocaleString("default", {
                    month: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-sm text-gray-600">
          {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-lg mt-4">{blog.description}</p>
      </article>
      {/* Back Button */}
      <div className="text-center mt-6">
        <Button onClick={() => navigate(-1)} label={"Back to Blogs"} />
      </div>
    </div>
  );
};

export default Blog;
