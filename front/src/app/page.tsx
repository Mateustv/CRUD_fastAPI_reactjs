'use client'
import { useState } from 'react'
import { axiosClient } from '@/services/axiosClient'
import '../styles/global.css'
import { useForm } from 'react-hook-form'

export default function Home() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit } = useForm()

  async function createUser(data: any) {
    await axiosClient.post('/users', data).catch(function (error) {
      console.log({ ...error })
    })
    // setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-4 items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Nome</label>
          <input
            className='border border-zinc-600 bg-zinc-800 text-white shadow-sm rounded h-10 px-3'
            type='text'
            {...register('name')}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">E-mail</label>
          <input
            className='border border-zinc-600 bg-zinc-800 text-white shadow-sm rounded h-10 px-3'
            type='email'
            {...register('email')}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Senha</label>
          <input
            className='border border-zinc-600 bg-zinc-800 text-white shadow-sm rounded h-10 px-3'
            type='password'
            {...register('password')}
          />
        </div>

        <button
          type='submit'
          className='bg-emerald-500 rounded-md text-white p-2 font-semibold'
        >
          Salvar
        </button>
      </form>

      <pre
      >
        {output}
      </pre>
    </main>
  )
}
