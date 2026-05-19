import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '#/api/auth';
import { useAuthContext } from '#/hooks/useAuthContext';

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({to: '/ideas'});
    },
    onError: (err:any) => {
      setError(err.message)
    }
  });

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({name, email, password});
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
        {
          error && (
            <div className='!mb-3 bg-red-100 text-red-700 px-4 py-2 rounded'>{error}</div>
          )
        }
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input className='!mb-3 w-full border border-gray rounded-md p-2' type='text' placeholder='Name' value={name} autoComplete='off' onChange={(e: any) => setName(e.target.value)}/>
        <input className='!mb-3 w-full border border-gray rounded-md p-2' type='email' placeholder='Email' value={email} autoComplete='off' onChange={(e: any) => setEmail(e.target.value)}/>
        <input className='!mb-3 w-full border border-gray rounded-md p-2' type='password' placeholder='Password' value={password} autoComplete='off' onChange={(e: any) => setPassword(e.target.value)}/>
        <button className='!bg-blue-600 text-white font-semibold px-4 py-2 w-full rounded-md hover:!bg-blue-700 disabled:opacity-50' disabled={isPending}>{ isPending ? 'Registering...' : 'Register'}</button>
      </form>
      <p className='text-sm text-center mt-4'>Already have an account?</p>
      <div className='!mt-4 flex items-center justify-center'><Link to='/register' className='!text-blue-600 hover:!underline font-medium'>Login</Link></div>
    </div>
  ) 
}
