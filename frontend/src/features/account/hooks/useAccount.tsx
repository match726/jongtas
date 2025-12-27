import { useContext } from 'react';
import { AccountContext } from '@/features/account/contexts/AccountContext';

export const useAccount = () => {
  // AccountContext から現在の値を取得。
  const context = useContext(AccountContext);

  if(context === undefined) {
    throw new Error('useAccountがAccountProviderでラップされていません。');
  }
  return context;
};