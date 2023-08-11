import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('http://host.docker.internal:8000/tasks');
    const data = await response.json();
    return NextResponse.json(data);
}
