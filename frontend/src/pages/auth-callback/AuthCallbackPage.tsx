import { Loader } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {

    const syncAttempted = useRef(false);
    const {isLoaded, user} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        

        const syncUser = async () => {
            if(!isLoaded || !user || syncAttempted.current) return;
            try {
                syncAttempted.current = true; // Prevent multiple syncs
                await axiosInstance.post('/auth/callback', {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                });
            } catch (error) {
                console.log('Error in auth callback', error);
            } finally {
                navigate('/');
            }
        };

        syncUser();
    }, [isLoaded, user, navigate])

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
        <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
            <CardContent className="flex flex-col items-center gap-4 pt-6">
                <Loader className="size-8 text-emerald-500 animate-spin" />
                <h3 className="text-zinc-400 text-xl font-bold">Logging In</h3>
                <p className="text-zinc-400 text-sm">Redirecting...</p>
            </CardContent>
        </Card>
    </div>
  )
}
export default AuthCallbackPage