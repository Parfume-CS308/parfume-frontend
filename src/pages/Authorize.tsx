import DottedShapeSvg from '@/components/svg/DottedShapeSvg'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordAgain: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().int().positive(),
    gender: z.string()
  })
  .superRefine(({ passwordAgain, password }, ctx) => {
    if (passwordAgain !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword']
      })
    }
  })

enum FormState {
  LOGIN,
  REGISTER
}

const Authorize = (props: Props) => {
  // #region States and Variables =========================================================
  const [formState, setFormState] = useState<FormState>(FormState.LOGIN)

  const [position, setPosition] = useState('top')

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  })

  // #endregion

  // #region Handler Functions ============================================================
  const handleSignupPageButtonClick = () => {
    setFormState(FormState.REGISTER)
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
      <Form {...loginForm}>
        {/* @ts-ignore */}
        <form onSubmit={() => {}} className='space-y-4 w-full'>
          <FormField
            control={loginForm.control}
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
          <FormField
            control={loginForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
          {/* @ts-ignore */}
        </form>
      </Form>
    )
  }

  const renderRegisterForm = () => {
    return (
      <Form {...registerForm}>
        {/* @ts-ignore */}
        <form onSubmit={() => {}} className='space-y-4 w-full'>
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
                    <Input placeholder='First Name' {...field} />
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
                    <Input placeholder='Last Name' {...field} />
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
                  <Input placeholder='Password' {...field} />
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
                  <Input placeholder='Confirm Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full gap-4'>
            <FormField
              control={registerForm.control}
              name='age'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder='Age' {...field} type='number' />
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
            Login
          </Button>
          {/* @ts-ignore */}
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
          <p className='text-2xl font-bold h-5'>Perfume</p>
          <p className='text-2xl font-bold '>Point</p>
        </div>
      </div>
    )
  }

  const renderForgetPassword = () => {
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

  const renderBottomControls = () => {
    if (formState === FormState.LOGIN) {
      return (
        <div className='flex flex-col items-center mt-4'>
          {renderForgetPassword()}
          {renderRegisterButton()}
        </div>
      )
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
