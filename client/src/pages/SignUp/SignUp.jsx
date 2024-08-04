import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Select, Option, Input } from '@material-tailwind/react';

const SignUp = () => {
  const [role, setRole] = useState('');

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://i.ibb.co/tBzy7LF/pexels-timmossholder-974314.jpg')]  bg-cover bg-no-repeat">
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-transparent shadow-lg bg-white'>
        <div className='mb-4 text-center'>
          <h1 className='my-1 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-500'>Welcome to GreenHarvesters</p>
        </div>
        <form noValidate='' action='' className='space-y-6 ng-untouched ng-pristine ng-valid'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm font-medium'>
                Name
              </label>
              <Input placeholder="Enter Your Name Here" />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm font-medium'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-transparent text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-transparent text-gray-900'
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Select Role
              </label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className=''
              >
                <Option value="Farmer">Farmer</Option> 
                <Option value="Expert">Expert</Option>
                <Option value="Buyer">Buyer</Option>
              </Select>
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2 font-medium'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-transparent text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 bg-green-400'
            >
              Continue
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>
        <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
