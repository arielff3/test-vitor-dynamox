import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { useDispatch } from 'react-redux'
import { login } from 'src/store/slices/authThunk'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logoMini from './assets/logo-mini.png'
import logo from './assets/logo.png'

export const Login = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(
    data => {
      const response = dispatch(login(data))
      return response
    },
    {
      onSuccess: () => {
        navigate('/dashboard')
      },
      onError: () => {
        toast('Usuário ou senha inválidos', {
          type: 'error',
        })
      },
    },
  )
  return (
    <section className="min-h-screen flex md:grid md:grid-cols-[60%,40%]">
      <aside className="bg-[#44142d] hidden md:flex justify-center items-center flex-col">
        <img src={logo} alt="logo" className="w-20rem" />
      </aside>
      <aside className="w-full bg-[#F7F7F7] flex md:justify-center items-center flex-col px-14">
        <img src={logoMini} alt="logo" className="md:hidden w-10rem mb-10" />
        <form
          className="w-full md:max-w-20rem flex justify-center flex-col items-center"
          onSubmit={handleSubmit(mutate)}
        >
          <Input
            type="email"
            placeholder="E-mail"
            value="vitor@dynamsox.com.br"
            {...register('email')}
          />
          <Input
            placeholder="Senha"
            type="password"
            className="mt-2"
            value="dynamox"
            {...register('password')}
          />
          <Button type="submit" className="mt-2" isLoading={isLoading}>
            LOGIN
          </Button>
        </form>
      </aside>
    </section>
  )
}
