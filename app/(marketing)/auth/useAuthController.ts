import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type VariantType = 'LOGIN' | 'REGISTER';

export const useAuthController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const form = searchParams.get('form')?.toUpperCase();
  const [variant, setVariant] = useState<VariantType>(
    form === 'REGISTER' ? 'REGISTER' : 'LOGIN',
  );

  const router = useRouter();

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
        if (name && email && password) {
          axios
            .post('/api/register', data)
            .then(() => signIn('credentials', data));
        }
      }

      if (variant === 'LOGIN') {
        if (email && password) {
          signIn('credentials', {
            ...data,
            redirect: false,
          }).then(callback => {
            if (callback?.error) {
              console.log('Invalid credentials!', callback);
            }

            if (callback?.ok && !callback?.error) {
              console.log('Logged in!');
              router.push('/learn');
            }
          });
        }
      }

      return console.log('Preencha todos os campos');
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
        callbackUrl: '/learn',
        redirect: false,
      }).then(callback => {
        if (callback?.error) {
          console.log('Something wen wrong!');
        }

        if (callback?.ok && !callback.error) {
          console.log('Logged in!');
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
    handleToggleVariant,
    register,
    onSubmit,
    handleSubmit,
    socialAction,
  };
};
