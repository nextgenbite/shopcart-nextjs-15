'use client';
import Container from '@/components/landing/Container'
import { useAuthStore } from '@/stores/authStore';
import React from 'react'

const DashboardPage = () => {
  const { user } = useAuthStore();
  return (
    <Container className='py-16'>
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      {user && (
        <p className="mt-4">Hello, {user.name}!</p>
      )}
    </Container>
  )
}

export default DashboardPage
