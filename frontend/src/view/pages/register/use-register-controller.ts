import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../../app/hooks/use-auth';
import { authService } from '../../../app/services/auth-service';
import { SignUpParams } from '../../../app/services/auth-service/signup';

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve conter pelo menos 8 dígitos'),
  confirmPassword: z.string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve conter pelo menos 8 dígitos'),
}).refine(
  (values) => values.password === values.confirmPassword,
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  },
);

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignUpParams) => authService.signup(data),
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta!');
    }
  });

  return {
    register, errors, handleSubmit, isLoading,
  };
}
