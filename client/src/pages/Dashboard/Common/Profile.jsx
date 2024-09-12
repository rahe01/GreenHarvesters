import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const Profile = () => {

    const auth = useAuth()
    // User profile data
    const { user } = auth
    const { displayName, email, photoURL} = user
    const [role ] = useRole()




  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb pageName="Profile" />

      {/* Cover Image */}
      <div className="relative h-35 md:h-65">
        <img
          src="https://iili.io/dgYGyrB.jpg"
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        />
        <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
          <label
            htmlFor="cover"
            className="flex cursor-pointer items-center justify-center gap-2 rounded color1b py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
          >
            <input type="file" name="cover" id="cover" className="sr-only" />
            <span>Edit</span>
          </label>
        </div>
      </div>

      {/* Profile Card */}
      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        {/* Profile Info */}
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          
          {/* Profile Picture */}
          <div className="relative mx-auto -mt-16">
            <div className="relative">
              <a href="#" className="relative block z-10 -mt-16">
                <img
                  src={photoURL}
                  alt="profile"
                  className="mx-auto z-20 object-cover rounded-full h-40 w-40 border-2 border-white"
                />
              </a>
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
        
              </label>
            </div>
          </div>

          {/* Name and Role */}
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {displayName}
            </h3>
            <p className="font-bold text-xl color1t underline uppercase">{role}</p>
            <p>{email}</p>
          </div>

          {/* Stats: Posts, Followers, Following */}
          <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
              <span className="font-semibold text-black dark:text-white">
                10
              </span>
              <p className="text-sm">Blogs Post</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
              <span className="font-semibold text-black dark:text-white">
                1.2k
              </span>
              <p className="text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
              <span className="font-semibold text-black dark:text-white">
                830
              </span>
              <p className="text-sm">Following</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-center">
            <Link
              
              className="flex cursor-pointer items-center justify-center gap-2 rounded color1b mt-4 py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
