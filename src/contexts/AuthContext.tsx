import { useAuthenticate } from '@/hooks/useAuthenticate';
import { useLogout } from '@/hooks/useLogout';
import { useValidateToken } from '@/hooks/useValidateToken';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { toastMessage } from '@/utils/helpers/toast-message';
interface UserAuth {
    id: string;
    email: string;
    name: string;
}

interface AuthContextProps {
    user: UserAuth | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    invalidLogin: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAuth | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const router = useRouter()
    const { mutate: mutateAuthenticate } = useAuthenticate()
    const { mutate: mutateValidateToken } = useValidateToken()
    const { mutate: mutateLogout } = useLogout()


    async function signIn(email: string, password: string) {

        setIsLoading(true);
        try {
            mutateAuthenticate({
                email,
                password
            }, {
                onSuccess: (data) => {
                    if (data.user) {

                        localStorage.setItem('userContext', JSON.stringify(data.user));
                        Cookies.set('token', data.token, { expires: 1 });
                        mutateValidateToken({

                        }, {
                            onSuccess: (user) => {
                                if (user) {
                                    setUser(user);
                                    router.push('/clients')
                                }
                            },
                            onError: () => {
                                setUser(null);
                            }
                        })
                    }
                },
                onError: () => {
                    toastMessage({ message: 'Email ou senha inválidos', type: 'error' })
                }
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    async function signOut() {
        setUser(null);
        try {
            mutateLogout({}, {
                onSuccess: () => {
                    localStorage.clear();
                },
                onError: (error) => {
                    toast.error(`Failed to logout: ${error}`);
                },
            })
        } catch (error) {
            toast.error(`Failed to logout: ${error}`);
        }
    }

    useEffect(() => {
        const checkUserAuthentication = async () => {
            setIsLoading(true);
            try {
                const storedUser = localStorage.getItem('userContext');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    mutateValidateToken({});
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error validating token:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user, isLoading, invalidLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
