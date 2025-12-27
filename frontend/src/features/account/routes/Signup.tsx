import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAccount } from '@/features/account/hooks/useAccount';

// 半角英数字と記号の正規表現
const alphanumericAndSymbols = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

// Zodスキーマの定義
const formSchema = z.object({
  accountid: z
    .string()
    .min(1, 'アカウントIDは必須入力です。')
    .regex(alphanumericAndSymbols, '半角英数字と記号のみ使用可能です。'),
  nickname: z
    .string()
    .min(1, '表示名は必須入力です。'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください。')
    .regex(alphanumericAndSymbols, '半角英数字と記号のみ使用可能です。'),
});

export function Signup() {

  const { setAccount } = useAccount();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの初期化
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountid: "",
      nickname: "",
      password: "",
    },
  });

  // 送信ハンドラー
  async function onSubmit(values: z.infer<typeof formSchema>) {

    setIsLoading(true);

    try {
      // Goバックエンドへのリクエスト
      const response = await fetch(import.meta.env.VITE_APP_BACKEND_URL + '/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json();

      console.log(data)
      if (!response.ok) {
        setError("アカウント作成に失敗しました。");
      } else {
        setAccount(data);
        navigate('/');
      }
    } catch (error: any) {
      setError("エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center">
        <Card className="w-[350px] md:w-[50%]">
          <CardHeader>
            <CardTitle className="text-2xl">新規登録</CardTitle>
          </CardHeader>
          {error && <p className="text-sm text-red-500 px-6">{error}</p>}
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="accountid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>アカウントID</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@jongtas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>表示名</FormLabel>
                      <FormControl>
                        <Input placeholder="ジャンタス" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      アカウント作成中...
                    </div>
                  ) : (
                    "アカウント登録"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};