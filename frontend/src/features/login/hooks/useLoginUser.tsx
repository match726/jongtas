import { useContext } from 'react'
import { LoginUserContext } from '@/features/login/contexts/LoginUserContext';

export const useLoginUser = () => {
//LoginUserContext から現在の値を取得。
  const context = useContext(LoginUserContext);

  if(context === undefined) {
    throw new Error('useLoginUserがLoginUserProviderでラップされていません。');
  }
  return context;
};