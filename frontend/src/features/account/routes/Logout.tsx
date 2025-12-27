import { Link } from 'react-router-dom';
import { Header } from '@/components/header';
import { useAccount } from '@/features/account/hooks/useAccount';

export function Logout() {
  const { setAccount } = useAccount();

  const handleLogout = () => {
    // ユーザー情報の初期化
    setAccount({id: "", accountid: "", password: "", nickname: "ゲスト", authority: 0, group: []});
    return "ご利用ありがとうございました。";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-6">ログアウト</h2>
        <p className="mb-6">{handleLogout()}</p>
        <Link to="/" className="underline text-blue-500 decoration-blue-500">
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
};