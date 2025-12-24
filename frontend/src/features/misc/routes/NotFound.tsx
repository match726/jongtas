import { Header } from '@/components/header';
import { Link } from 'react-router-dom';

export function NotFound()  {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">404 - Page Not Found</h2>
        <p className="mb-6">未実装のページです。</p>
        <Link to="/" className="underline text-blue-500 decoration-blue-500">
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
};