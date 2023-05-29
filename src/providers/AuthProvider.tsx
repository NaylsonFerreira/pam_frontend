import {
    Dispatch, ReactNode, SetStateAction,
    createContext, useContext, useEffect, useState
} from 'react';

interface AuthProviderInterface {
    token?: string
    setToken: Dispatch<SetStateAction<string>>
}

const AuthContext = createContext<AuthProviderInterface>({
    setToken: function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    }
});

export function useAuthContext() {
    return useContext(AuthContext)
}

interface Providerprops {
    children: ReactNode
}

export default function AuthProvider({ children }: Providerprops) {
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if (localToken) {
            setToken(localToken)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token])

    const initialState = {
        token,
        setToken
    }

    return <AuthContext.Provider value={initialState} > {children} </AuthContext.Provider>
}