import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";

const RegisterModal = () => {
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        RegisterModal.onClose();
        LoginModal.onOpen();
    }, [LoginModal, RegisterModal, isLoading]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            })
            
            RegisterModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [RegisterModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />           
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                    onClick={onToggle} 
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                        pl-1
                    "
                >Sign in!</span>
            </p>
        </div>
    )

    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Create your account!"
            actionLabel="Register"
            onClose={RegisterModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;