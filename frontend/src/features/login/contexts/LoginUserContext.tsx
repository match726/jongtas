import { createContext, useState, type ReactNode } from 'react';
import type { LoginUserProps } from '@/features/login/types/login';

export type LoginUserContextProps = {
  loginUser: LoginUserProps
  setLoginUser: (user: LoginUserProps) => void;
};

export const LoginUserContext = createContext<LoginUserContextProps | undefined>(undefined);

export const LoginUserProvider = ({ children }: { children: ReactNode }) => {

  const [loginUser, setLoginUser] = useState<LoginUserProps>({
    id: 0,
    name: "ゲスト",
    authority: 0,
  });

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
