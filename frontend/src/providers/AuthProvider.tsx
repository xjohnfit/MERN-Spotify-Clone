import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";

const updateApiToken = (token: string | null) => {
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const { getToken, userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus } = useAuthStore();
    const { initializeSocket, disconnectSocket } = useChatStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token) {
                    await checkAdminStatus();

                    //initialize socket.io connection
                    if(userId) {
                        initializeSocket(userId);
                    }
                }
            } catch (error: any) {
                updateApiToken(null);
                console.log('Error getting token', error);
            } finally {
                setLoading(false);
            }
        }

        initAuth();

        //clean up function
        return () => {
            disconnectSocket();
        }
    }, [getToken, userId, checkAdminStatus, initializeSocket, disconnectSocket]);

    if(loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-8 text-emerald-500 animate-spin" />
            </div>
        )
    }

  return (
    <div>{children}</div>
  )
}
export default AuthProvider