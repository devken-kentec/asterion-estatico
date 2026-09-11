export interface UserLogin {
    email: string;
    senha: string;
}

export interface User {
  id: number;
  nome: string;
  apelido: string;
  dataNascimento: string;
  fone: string;
  whatsapp: string;
  email: string;
  cep: string;
  endereco: string;
  complemento: string;
  chaveUsuario: string;
  autenticacao: string;
  role: string;
  status: string;
}