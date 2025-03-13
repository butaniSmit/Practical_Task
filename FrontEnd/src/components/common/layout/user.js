import ProtectedRoute from "@/components/protectedRoute";
import NavBar from "../elements/navbar";

const Layout =({children})=>{
return(
    <>
    <ProtectedRoute>
    <NavBar/>
    {children}
    </ProtectedRoute>
    </>
)
}
export default Layout;