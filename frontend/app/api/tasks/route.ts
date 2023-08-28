import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('http://host.docker.internal:8000/tasks',
        { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const taskData = await request.json(); // リクエストからJSONデータを取得

    // データベースに保存するロジックをここに追加（例：fetchでサーバーエンドポイントにPOSTリクエストをする）
    const postResponse = await fetch('http://host.docker.internal:8000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    // POST レスポンスデータ
    const res = await postResponse.json();

    return NextResponse.json({ res });
}
