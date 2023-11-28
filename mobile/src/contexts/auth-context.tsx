import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { userService } from "../infra/user-service";
import { User } from "../models/user";
import { LoadingScreen } from "../presentation/components/loading-screen";

type AuthContextProps = {
  isSignedIn: boolean;
  signIn: (accessToken: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  user?: User;
}
export const AuthContext = createContext({} as AuthContextProps)

type Props = {
  children: ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { data, isFetching, isSuccess, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: userService.me,
    enabled: isSignedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback(async (accessToken: string) => {
    await AsyncStorage.setItem('financeApp:token', accessToken);

    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('financeApp:token');
    remove();

    setIsSignedIn(false);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('financeApp:token')
      .then(accessToken => {
        if (accessToken)
          setIsSignedIn(true);
        else
          setIsSignedIn(false);
      });
  }, []);

  useEffect(() => {
    if (!isSuccess)
      AsyncStorage.removeItem('financeApp:token')
        .then(() => {
          setIsSignedIn(false);
        });
  }, [isSuccess]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: Boolean(isSuccess && isSignedIn),
        signIn,
        signOut,
        isLoading: isFetching,
        user: data
      }}
    >
      {isFetching && (<LoadingScreen />)}
      {!isFetching && (children)}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
