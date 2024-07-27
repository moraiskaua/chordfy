import { routes } from '@/constants/routes';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type VariantType = 'LOGIN' | 'REGISTER';

export const useAuthController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const form = searchParams.get('form')?.toUpperCase();
  const [variant, setVariant] = useState<VariantType>(
    form === 'REGISTER' ? 'REGISTER' : 'LOGIN',
  );

  const session = useSession();

  const handleToggleVariant = () =>
    setVariant(prevVariant => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { name, email, password } = data;
    setIsLoading(true);
    try {
      if (variant === 'REGISTER') {
        if (!name || !email || !password)
          return toast.error('Fill in all fields');

        if (name && email && password) {
          axios
            .post('/api/register', data)
            .then(() => signIn('credentials', data));
        }
      }

      if (variant === 'LOGIN') {
        if (!email || !password) return toast.error('Fill in all fields');

        if (email && password) {
          signIn('credentials', {
            ...data,
            redirect: false,
          }).then(callback => {
            if (callback?.error) {
              toast.error('Something went wrong!');
            }

            if (callback?.ok && !callback?.error) {
              toast.success('Logged in!');
            }
          });
        }
      }
    } catch (e) {
      console.log('error: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    try {
      signIn(action, {
        callbackUrl: routes.LEARN,
        redirect: false,
      }).then(callback => {
        if (callback?.error) {
          toast.error('Something went wrong!');
        }

        if (callback?.ok && !callback.error) {
          toast.success('Logged in!');
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    variant,
    isLoading,
    errors,
    session,
    handleToggleVariant,
    register,
    onSubmit,
    handleSubmit,
    socialAction,
  };
};
