'use client';

import { Button } from '@/components/ui/Button';
import { useAuthController } from './useAuthController';
import { Input } from '@/components/Input';
import { FaGoogle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = ({}) => {
  const {
    variant,
    isLoading,
    errors,
    session,
    handleToggleVariant,
    register,
    handleSubmit,
    onSubmit,
    socialAction,
  } = useAuthController();

  if (session.status === 'authenticated') {
    return redirect(routes.LEARN);
  }

  return (
    <div className="max-w-[400px] mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {variant === 'REGISTER' && (
          <Input
            id="name"
            placeholder="Name"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          id="email"
          placeholder="E-mail"
          type="email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Button disabled={isLoading} type="submit">
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center w-full">
          <Button
            variant="default"
            onClick={() => socialAction('google')}
            className="w-full bg-rose-600 text-white border-rose-700 hover:bg-rose-700/80 hover:text-white border-2 border-b-4 active:border-b-2"
          >
            <FaGoogle className="size-6" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          {variant === 'LOGIN' ? 'New to Chordfy?' : 'Already have an account?'}
        </div>
        <div onClick={handleToggleVariant} className="underline cursor-pointer">
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
