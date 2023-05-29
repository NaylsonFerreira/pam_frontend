import { Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import Layout from '@/patterns/Layout';
import authService from '@/services/auth';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  .login-form{
    margin: 20px auto;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`

export default function HomePage() {
  const { token, setToken } = useAuthContext()
  const [data, setData] = useState({
    username: 'admin',
    password: 'admin'
  })
  function handleSubmit() {
    authService.login(data).then(resp => {
      if (resp['token']) {
        setToken(`Token ${resp['token']}`)
      }
    }).catch(error => {
      console.log(error)
      setToken('')
    })
  }
  if (token?.length) {
    return (
      <Layout pageTitle='Home Page'>
        <Main>
          Home Page
        </Main>
      </Layout>
    )
  }
  return (
    <Main>
      <div className='login-form'>
        <div className='title-form'>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </div>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          defaultValue={data['username']}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setData(o => ({ ...o, 'password': event.target.value }));
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type='password'
          defaultValue={data['password']}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setData(o => ({ ...o, 'password': event.target.value }));
          }}
        />
        <Button fullWidth onClick={() => handleSubmit()} variant="contained">
          Salvar
        </Button>
      </div>
    </Main>
  )
}