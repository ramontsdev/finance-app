import { useNavigation } from "@react-navigation/native";
import { Controller } from "react-hook-form";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Text } from "../../../components/text";
import { TouchLink } from "../../../components/touch-link";
import { Container, Header, Title, Wrap, Wrapper } from "./styles";
import { useSignUpController } from "./use-sign-up-controller";

export function SignUpScreen() {
  const navigation = useNavigation();
  const { control, errors, handleSubmit, isLoading } = useSignUpController();

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Crie sua conta</Title>

          <Wrap>
            <Text>Já possui uma conta?</Text>

            <TouchLink onPress={() => navigation.navigate('signIn')}>
              Fazer login
            </TouchLink>
          </Wrap>
        </Header>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              label="E-mail"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Confirme a senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          onPress={handleSubmit}
          isLoading={isLoading}
        >
          Criar
        </Button>
      </Wrapper>
    </Container>
  )
}
