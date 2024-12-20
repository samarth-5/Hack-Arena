import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

export default function preview({}: Props) {

  const router = useRouter();
  const { title } = router.query;
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contest Preview</h1>
      {title ? (
        <p className="text-lg">You are previewing the contest: <strong>{title}</strong></p>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  )
}