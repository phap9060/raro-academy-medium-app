import { Button } from "../Button";
import { Input } from "../Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate()

  async function autenticarUsuario(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true)
    setErro('')
    try {
      const url = 'http://3.221.159.196:3307/auth/login'
      const response = await axios.post(url,
        {
          login,
          senha
        }
      );
      const { access_token, id } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", id);
        navigate("/artigos");
      }
      setLoading(false)
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        setErro('Usuário ou senha Inválidos');
      } else {
        setErro('Erro ao autenticar usuário. Tente novamente mais tarde.');
      }
      setLoading(false)    
    }

  }





  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://rarolabs.com.br/assets/logo-cae9beb1976500005b5e29dea19bdaa2761082232703a16beb71ffd2117014e5.png"
            alt="Workflow"
          />
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={autenticarUsuario}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-5">
              <Input
                type="text"
                name="login"
                label="Login"
                placeholder="login"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <Input
                type="password"
                name="senha"
                label="senha"
                placeholder="********"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button type="submit">{loading ? 'Carregando...' : 'Entrar'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
