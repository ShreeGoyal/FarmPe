import { Text } from "react-native"
import Login from "../components/auth/Login"

export default function LoginScreen({ navigation }) {
    return (
        <>
            <Login navigation={navigation} />
        </>
    )
}