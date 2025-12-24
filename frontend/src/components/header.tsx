import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, LogIn, LogOut, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetTrigger } from '@/components/ui/sheet';
import { useLoginUser } from '@/features/login/hooks/useLoginUser';

export function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ログイン判定、ユーザー情報取得
  const context = useLoginUser();
  if (!context) throw new Error("LoginUserContextが設定されていません。");
  const { loginUser } = context;

  const menuItems = [
    { name: "ヘルプ", icon: HelpCircle, href: "/help" },
    { name: "設定", icon: Settings, href: "/settings" },
    { name: loginUser.id === 0 ? "ログイン" : "ログアウト",
      icon: loginUser.id === 0 ? LogIn : LogOut,
      href: loginUser.id === 0 ? "/login" : "/logout", },
  ]

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">麻</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">JongTas</h1>
            <p className="hidden md:block text-xs text-muted-foreground">麻雀コンペ運営サポート</p>
          </div>
        </Link>

        {/* デスクトップの場合 */}
        <nav className="hidden md:flex items-center gap-2">
          {menuItems.map((item) => (
            <Button key={item.name} variant="ghost" className="gap-2" asChild>
              <Link to={item.href}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>

        {/* モバイルの場合 */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="sr-only">ヘッダーメニュー</SheetTitle>
              <SheetDescription className="sr-only">
                サイト内のナビゲーションメニューです
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-lg rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>

  );
};