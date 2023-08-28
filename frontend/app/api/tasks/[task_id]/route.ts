import { NextResponse, Request } from 'next/server';

// GET request for a specific task by task_id
export async function GET(
    request: Request,
    { params }: { params: { task_id: string } }
) {
    const taskId = params.task_id; // Task ID from URL
    const response = await fetch(`http://host.docker.internal:8000/tasks/${taskId}`, {
        cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data);
}

// Update a specific task by task_id
export async function PUT(
    request: Request,
    { params }: { params: { task_id: string } }
) {
    const taskId = params.task_id; // Task ID from URL
    const updatedTaskData = await request.json(); // Data from the request

    const putResponse = await fetch(`http://host.docker.internal:8000/tasks/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
    });

    const putData = await putResponse.json();
    return NextResponse.json(putData);
}

// Delete a specific task by task_id
export async function DELETE(
    request: Request,
    { params }: { params: { task_id: string } }
) {
    const taskId = params.task_id; // Task ID from URL

    const deleteResponse = await fetch(`http://host.docker.internal:8000/tasks/${taskId}`, { method: 'DELETE', });

    const deleteData = await deleteResponse.json();
    return NextResponse.json(deleteData);
}
