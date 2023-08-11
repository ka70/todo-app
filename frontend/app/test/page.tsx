import React from 'react';

export default function page = async () => {
    const response = await fetch('http://localhost:3200/api/tasks');
    return (
        <div>page</div>
    )
}
