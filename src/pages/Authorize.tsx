import { loginRequest, registerRequest } from '@/api'
import DottedShapeSvg from '@/components/svg/DottedShapeSvg'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { genderRegex, passwordRegex } from '@/constants/regex'
import useAuth from '@/hooks/contexts/useAuth'
import useCart from '@/hooks/contexts/useCart'
import { cn } from '@/lib/utils'
import { User } from '@/types/entity/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character and must be at least 8 characters long'
    )
})

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        passwordRegex,
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character and must be at least 8 characters long'
      ),
    passwordAgain: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    age: z.number().int().positive(),
    gender: z.string().regex(genderRegex)
  })
  .superRefine(({ passwordAgain, password }, ctx) => {
    if (passwordAgain !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['passwordAgain']
      })
    }
  })

enum FormState {
  LOGIN,
  REGISTER
}

const Authorize = () => {
  // #region States and Variables =========================================================
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formState, setFormState] = useState<FormState>(FormState.LOGIN)
  const { login } = useAuth()
  const { syncCart } = useCart()

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordAgain: '',
      firstName: '',
      lastName: '',
      age: undefined,
      gender: ''
    }
  })

  const navigate = useNavigate()

  // #endregion

  // #region Handler Functions ============================================================
  const handleSignupPageButtonClick = () => {
    setFormState(FormState.REGISTER)
  }

  const handleSigninPageButtonClick = () => {
    setFormState(FormState.LOGIN)
  }

  const handleLoginFormSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async data => {
    try {
      const response = await loginRequest(data)
      if (response.status === 200) {
        const userData: User = response.data.user
        await login(userData)
        await syncCart()
        navigate('/')
      }
    } catch (error: any) {
      const errorResponse = error.response
      if (typeof errorResponse.data.message === 'string') {
        setErrorMessage(errorResponse.data.message)
      } else if (Array.isArray(errorResponse.data.message)) {
        setErrorMessage(errorResponse.data.message[0])
      }
    }
  }

  const handleRegisterFormSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async data => {
    try {
      const response = await registerRequest(data)
      if (response.status === 200) {
        const userData: User = response.data.user
        await login(userData)
        await syncCart()
        navigate('/')
      }
    } catch (error: any) {
      const errorResponse = error.response
      if (typeof errorResponse.data.message === 'string') {
        setErrorMessage(errorResponse.data.message)
      } else if (Array.isArray(errorResponse.data.message)) {
        setErrorMessage(errorResponse.data.message[0])
      }
    }
  }
  // #endregion

  // #region Render Functions =============================================================

  const renderOrnaments = () => {
    return (
      <>
        <div className='absolute top-1 right-1'>
          <DottedShapeSvg />
        </div>
        <div className='absolute bottom-1 left-1 rotate-180'>
          <DottedShapeSvg />
        </div>
      </>
    )
  }

  const renderLoginForm = () => {
    return (
      <Form {...loginForm} key={'loginForm'}>
        <form onSubmit={loginForm.handleSubmit(handleLoginFormSubmit)} className='space-y-4 w-full'>
          <FormField
            control={loginForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Sign in
          </Button>
          {errorMessage && <FormMessage className='text-center'>{errorMessage}</FormMessage>}
        </form>
      </Form>
    )
  }

  const renderRegisterForm = () => {
    return (
      <Form {...registerForm} key={'registerForm'}>
        <form onSubmit={registerForm.handleSubmit(handleRegisterFormSubmit)} className='space-y-4 w-full'>
          <FormField
            control={registerForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full gap-4'>
            <FormField
              control={registerForm.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder='First Name' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder='Last Name' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={registerForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name='passwordAgain'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Confirm Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full gap-4'>
            <FormField
              control={registerForm.control}
              name='age'
              render={() => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='Age'
                      type='number'
                      {...registerForm.register('age', {
                        valueAsNumber: true
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn('w-full', { 'text-muted-foreground': !field.value })}>
                        <SelectValue placeholder='Gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full'>
            Sign up
          </Button>
          {errorMessage && <FormMessage className='text-center'>{errorMessage}</FormMessage>}
        </form>
      </Form>
    )
  }

  const renderForms = () => {
    if (formState === FormState.LOGIN) {
      return renderLoginForm()
    } else if (formState === FormState.REGISTER) {
      return renderRegisterForm()
    }
  }

  const renderLogo = () => {
    return (
      <div className='flex items-center gap-4'>
        <img src={`/assets/images/logo.jpg`} alt='logo' className='w-12 h-12' />
        <div>
          <p className='text-2xl h-5'>Perfume</p>
          <p className='text-2xl'>Point</p>
        </div>
      </div>
    )
  }

  const renderForgetPassword = () => {
    return null
    return (
      <Button variant={'ghost'} className='p-0 h-4 text-sm'>
        Forget Password?
      </Button>
    )
  }

  const renderRegisterButton = () => {
    return (
      <p className='p-0 text-xs'>
        Not a member yet?{' '}
        <Button variant={'link'} className='p-0 text-xs' onClick={handleSignupPageButtonClick}>
          Sign up
        </Button>
      </p>
    )
  }

  const renderLoginButton = () => {
    return (
      <p className='p-0 text-xs'>
        Already have an account?{' '}
        <Button variant={'link'} className='p-0 text-xs' onClick={handleSigninPageButtonClick}>
          Sign in
        </Button>
      </p>
    )
  }

  const renderBottomControls = () => {
    if (formState === FormState.LOGIN) {
      return (
        <div className='flex flex-col items-center mt-4'>
          {renderForgetPassword()}
          {renderRegisterButton()}
        </div>
      )
    } else if (formState === FormState.REGISTER) {
      return <div className='flex flex-col items-center mt-4'>{renderLoginButton()}</div>
    }
  }

  // #endregion

  return (
    <div className='flex items-center justify-center h-screen bg-pageBackground'>
      <div
        className='bg-white p-16 rounded-lg shadow-lg flex flex-col items-center gap-4 relative'
        style={{ width: '520px' }}
      >
        {renderLogo()}
        {renderForms()}
        {renderOrnaments()}
        {renderBottomControls()}
      </div>
    </div>
  )
}

export default Authorize
