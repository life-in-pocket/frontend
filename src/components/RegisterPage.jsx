import "../assets/css/components/RegisterPage.css";
import AuthForm from "../features/auth/authForm";

function RegisterPage() {
    return (
        <AuthForm
            fields={[]}
            submitLabel="Register"
            footer={null}
        />
    );
}

export default RegisterPage;