import Head from 'next/head'
import Layout from '@/layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiEye, HiEyeOff } from 'react-icons/hi'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik';
import login_validate from '@/lib/validate'
import { useRouter } from 'next/router'

export default function Login() {
    const [show, setShow] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })
        if(status.ok) router.push(status.url)
    }

    //Google Handler Function
    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: "https://signup-login-authentication.vercel.app/" })
    }

    //Discord Handler Function
    async function handleDiscordSignin() {
        signIn('discord', { callbackUrl: "http://localhost:3000/" })
    }


    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Welcome Back!</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>Welcome to the application words go here</p>
                </div>
                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : 'border-blue-400'}`}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : 'border-blue-400'}`}>
                        <input
                            type={`${show ? "text" : 'password'}`}
                            name='password'
                            placeholder='Password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            {show ? <HiEyeOff size={25} /> : <HiEye size={25} /> }
                        </span>
                    </div>
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                            Sign In With Google <Image src={'/assets/google.svg'} width='20' height={20} ></Image>
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' onClick={handleDiscordSignin} className={styles.button_custom}>
                            Sign In With Discord <Image src={'/assets/discord.svg'} width={25} height={25}></Image>
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Don't have an account yet? <Link className='text-blue-700' href={'/register'}>Sign Up</Link>
                </p>
            </section>
        </Layout>
    )
}