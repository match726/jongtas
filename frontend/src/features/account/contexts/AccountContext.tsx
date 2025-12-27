import { createContext, useState, type ReactNode } from 'react';
import type { AccountProps } from '@/features/account/types/account';

export type AccountContextProps = {
  account: AccountProps
  setAccount: (account: AccountProps) => void;
};

export const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {

  const [account, setAccount] = useState<AccountProps>({
    id: "",
    accountid: "",
    password: "",
    nickname: "ゲスト",
    authority: 0,
    group: [],
  });

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
