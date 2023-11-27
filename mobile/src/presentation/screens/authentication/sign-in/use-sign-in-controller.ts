import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import Toast from 'react-native-toast-message';
import { z } from "zod";
import { useAuth } from '../../../../contexts/auth-context';
import { authenticationService } from '../../../../infra/authentication-service';

const schema = z.object({
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(1, 'Digite sua senha')
});

type FormValues = z.infer<typeof schema>;

export function useSignInController() {
  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutateAsync, isLoading } = useMutation(authenticationService.signIn);
  const { signIn } = useAuth();

  const handleSubmit = hookFormSubmit(async (values) => {
    try {
      const { accessToken } = await mutateAsync(values)

      await signIn(accessToken);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Algo não está certo',
        text2: 'Houve um erro ao tentar logar sua conta.',
      })
    }
  });

  return {
    control,
    errors,
    handleSubmit,
    isLoading
  };
};
