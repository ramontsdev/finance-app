import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useAuth } from "../../../../contexts/auth-context";
import { authenticationService } from "../../../../infra/authentication-service";

const schema = z.object({
  name: z.string().min(1, 'Digite seu nome'),
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(1, 'Digite sua senha'),
  confirmPassword: z.string().min(1, 'Digite sua senha')
})
  .refine(data => data.password === data.confirmPassword,
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword']
    });

type FormValues = z.infer<typeof schema>;

export function useSignUpController() {
  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { signIn, isLoading: isSignLoading } = useAuth();
  const { mutateAsync, isLoading } = useMutation(authenticationService.signUp)

  const handleSubmit = hookFormSubmit(async (values) => {
    try {
      const { accessToken } = await mutateAsync(values);

      signIn(accessToken);
    } catch (error) {
      const err = error as AxiosError;

      if (err?.response?.status == 409) {
        Toast.show({
          type: 'error',
          text1: 'E-mail já cadastrado'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Houve um erro ao tentar cadastrar'
        });
      };
    };
  });

  return {
    control,
    errors,
    handleSubmit,
    isLoading: isSignLoading || isLoading
  };
};
