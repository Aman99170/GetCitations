'use client'
import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export function LoginUser({ userType }: { userType: String }) {
    const router = useRouter()

    const storage = useMemo(() => {
        if (typeof window !== 'undefined')
            return (
                localStorage.getItem('user')
            )
        return null
    }, [])
    useEffect(() => {
        if (storage) {
            router.push(`/?userType=${userType}`);
        }
    }, [router, storage])

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('email is required')
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'invalid email'
            ),
        password: yup.string()
            .required("Password is required")
    })
    const defaultValues = {
        email: "",
        password: ""
    }
    const { handleSubmit, register, getValues, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: defaultValues,
        resolver: async (data, context, options) => {
            return yupResolver(schema)(data, context, options)
        }
    })

    const onsubmit = useCallback(async () => {
        try {
            const payload = {
                email: getValues("email"),
                password: getValues("password"),
            }

            const URL = userType === "Freelancer" ? 'loginFreelancer' : 'login'
            const BASE_URL = userType === "Researcher" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_FREELANCER

            let res = await fetch(`${BASE_URL}/${URL}`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 401) {
                alert('User session expired, logging out')
                router.push("/");
                localStorage.clear();
            }
            else if (res.status === 200) {
                res = await res.json()
                const expirationTime = Date.now() + 3600 * 1000;
                localStorage.setItem("user", JSON.stringify(res))
                localStorage.setItem('tokenExpiration', expirationTime.toString());
                localStorage.setItem("userType", userType.toString()),
                    router.push(`/?userType=${userType}`)
            }
            else {
                alert("Please enter correct details")
            }

        }
        catch (err) {
            console.error(err)
        }

    }, [getValues, fetch, router])

    return (
        <>
            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    marginBottom: "20px",
                    padding: "40px 0px 30px 0px",
                }}
            >
                <Typography variant="h3" align="center">
                    Login as {userType}
                </Typography>
            </Stack>

            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    paddingTop: "10px",
                }}
            >
                <Stack spacing={2} sx={{ width: '100%', maxWidth: '500px' }}>
                    <Typography>Email</Typography>
                    <TextField
                        fullWidth
                        {...register("email", { required: "Email is required" })}
                    />
                    <Typography color="red">
                        {errors.email ? errors.email.message : ''}
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                alignItems="center"
                sx={{
                    paddingTop: "10px",
                }}
            >
                <Stack spacing={2} sx={{ width: '100%', maxWidth: '500px' }}>
                    <Typography>Password</Typography>
                    <TextField
                        fullWidth
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <Typography color="red">
                        {errors.password ? errors.password.message : ''}
                    </Typography>
                    <Link href="/">Forget Password?</Link>
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="center" pt="20px">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "seagreen",
                        color: "white",
                        width: { xs: '90%', sm: '70%', md: '200px' },
                        ":hover": {
                            backgroundColor: "seagreen",
                        },
                    }}
                    onClick={handleSubmit(onsubmit)}
                >
                    Login
                </Button>
            </Stack>

            <Stack direction="row" justifyContent="center" pt="20px">
                <Typography>------------------------------------------ OR ------------------------------------------</Typography>
            </Stack>

            <Stack direction="row" justifyContent="center" pt="20px" spacing={2}>
                <IconButton size="large"><GoogleIcon /></IconButton>
                <IconButton size="large"><FacebookIcon /></IconButton>
                <IconButton size="large"><AppleIcon /></IconButton>
            </Stack>

            <Stack direction="row" justifyContent="center" pt="20px" pb="40px" spacing={1}>
                <Typography>Don't have an account?</Typography>
                <Link href="/sign-up">Signup</Link>
            </Stack>

        </>
    )
}