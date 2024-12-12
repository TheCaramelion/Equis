import { useState, FormEvent, ChangeEvent } from "react";

interface LoginData {
    username: string;
    password: string;
}

interface SignupData {
    username: string;
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" });

    const [signupData, setSignupData] = useState<SignupData>({ username: "", email: "", password: "" });

    const [message, setMessage] = useState<string>("");

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch("/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Welcome back, ${data.username}!`);
                // window.location.href = "/home";
            } else {
                const error = await response.json();
                setMessage(error.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    const handleSignupSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Account created successfully for ${data.username}!`);
                setSignupData({ username: "", email: "", password: "" });
            } else {
                const error = await response.json();
                setMessage(error.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="bg-gray-200 py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto">
            {message && <p className="text-center text-xl text-red-500">{message}</p>}

            <form className="flex flex-col gap-10 mb-10" onSubmit={handleLoginSubmit}>
                <h2 className="text-3xl font-bold text-center">Logueate en Equis</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="text-xl py-2 rounded-full px-4"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="text-xl py-2 rounded-full px-4"
                    required
                />
                <button
                    className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                    type="submit"
                >
                    Entrar
                </button>
            </form>

            <p className="text-center text-xl">¿No tienes una cuenta?</p>

            <form className="flex flex-col gap-10" onSubmit={handleSignupSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    className="text-xl py-2 rounded-full px-4"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="text-xl py-2 rounded-full px-4"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="text-xl py-2 rounded-full px-4"
                    required
                />
                <button
                    className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                    type="submit"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
};

export default Signin;
