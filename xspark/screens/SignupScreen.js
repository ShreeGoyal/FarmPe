import { Text } from "react-native"
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"

export default function SignupScreen({navigation}){
    return (
        <Signup navigation={navigation}/>
    )
}