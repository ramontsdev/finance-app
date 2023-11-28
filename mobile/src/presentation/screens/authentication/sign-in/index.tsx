import { useNavigation } from "@react-navigation/native";
import { Controller } from "react-hook-form";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { Text } from "../../../components/text";
import { TouchLink } from "../../../components/touch-link";
import { Container, Header, Title, Wrap, Wrapper } from "./styles";
import { useSignInController } from "./use-sign-in-controller";

export function SignInScreen() {
  const { control, handleSubmit, errors, isLoading } = useSignInController()
  const navigation = useNavigation();

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Entrar em sua conta</Title>

          <Wrap>
            <Text>Novo por aqui?</Text>

            <TouchLink onPress={() => navigation.navigate('signUp')}>
              Crie uma conta
            </TouchLink>
          </Wrap>
        </Header>

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

        <Button
          onPress={handleSubmit}
          isLoading={isLoading}
        >
          Entrar
        </Button>
      </Wrapper>
    </Container>
  )
}
