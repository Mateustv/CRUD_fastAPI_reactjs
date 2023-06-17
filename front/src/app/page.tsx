'use client'
import '../styles/global.css'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { register, handleSubmit } = useForm()

  function createUser(data: any) {
    console.log(data)
  }


  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor="">E-mail</label>
          <input
            className='border border-zinc-200 shadow-sm rounded h-10 px-3'
            type='email'
            {...register('email')}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Senha</label>
          <input
            className='border border-zinc-200 shadow-sm rounded h-10 px-3'
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
    </main>
  )
}
