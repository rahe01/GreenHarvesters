import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { ImSpinner9 } from 'react-icons/im'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from || '/' // Default to '/' if `from` is not set

  const { signIn, signInWithGoogle, loading, setLoading } = useAuth()

  const googleSignIn = async () => {
    try {
      setLoading(true)
      const result = await signInWithGoogle()
      const user = result.user
      toast.success('Login Successful')
      navigate(from, { replace: true })
      console.log(user)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error) // Log the error for debugging
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      setLoading(true)
      // eslint-disable-next-line no-unused-vars
      const result = await signIn(email, password)
      
      
      toast.success('Login Successful')
      form.reset()
      navigate(from, { replace: true })
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error) // Log the error for debugging
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://i.ibb.co/tBzy7LF/pexels-timmossholder-974314.jpg')] bg-cover bg-no-repeat">
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleLogin}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm'>
                Password
              </label>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-green-400 w-full rounded-md py-3 text-white'
              disabled={loading}
            >
              {loading ?  <ImSpinner9 className="animate-spin m-auto"></ImSpinner9> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>
        <button
          onClick={googleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer'
          disabled={loading}
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
