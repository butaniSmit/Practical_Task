import { PrivatetRoute } from "@/components/protectedRoute";

const LoginLayout = ({children})=>{
return(
    <>
    <PrivatetRoute>
    {children}
    </PrivatetRoute>
    </>
)
}

export default LoginLayout;