import { useEffect, useState } from 'react';
import { LayoutGrid, Settings, Users, Shuffle, BarChart3, Plus } from 'lucide-react';
import { Header } from '@/components/header';
import { FunctionCard } from '@/components/function-card';

const API_URL = import.meta.env.VITE_APP_BACKEND_URL + "/hello";

export function Home() {

  const [message, setMessage] = useState('接続中...');

  useEffect(() => {
    // バックエンドのAPIを叩く
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error(err)
        setMessage('接続エラーが発生しました')
      })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 機能一覧 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">機能一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FunctionCard
              title="新規大会を作成"
              description="大会名、開催日、参加人数を指定して新しい大会をセットアップ"
              icon={Plus}
              href="/tournaments/new"
              color="secondary"
            />
            <FunctionCard
              title="ルール設定"
              description="スコア計算方法、ルール、順位決定方式をカスタマイズ"
              icon={Settings}
              href="/rules"
              color="secondary"
            />
            <FunctionCard
              title="チーム・プレイヤー管理"
              description="参加プレイヤーとチームを一元管理。情報の追加・編集が簡単"
              icon={Users}
              href="/teams"
              color="accent"
            />
            <FunctionCard
              title="対戦表の自動生成"
              description="参加者数に応じた対戦表を自動作成。手動調整もサポート"
              icon={Shuffle}
              href="/matchups"
              color="primary"
            />
            <FunctionCard
              title="スコア入力・管理"
              description="試合結果をリアルタイムで入力。自動計算でスコアを更新"
              icon={BarChart3}
              href="/scores"
              color="secondary"
            />
            <FunctionCard
              title="大会管理"
              description="進行中の大会や過去の大会をすべて確認・管理"
              icon={LayoutGrid}
              href="/tournaments"
              color="accent"
            />
          </div>
        </section>
      </main>

      {/* バックエンドとの疎通確認 */}
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>疎通確認テスト</h1>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
          {message}
        </p>
      </div>

    </div>
  );
};