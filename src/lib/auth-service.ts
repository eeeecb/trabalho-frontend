// src/lib/auth-service.ts
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthData {
  user: User | null;
  token: string | null;
}

class AuthService {
  private static AUTH_KEY = "auth_data";

  static getAuthData(): AuthData {
    if (typeof window === "undefined") return { user: null, token: null };

    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? (JSON.parse(data) as AuthData) : { user: null, token: null };
  }

  static setAuthData(data: AuthData) {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(data));
  }

  static clearAuthData() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  static isAuthenticated(): boolean {
    const { token } = this.getAuthData();
    return !!token;
  }

  static async login(email: string, password: string): Promise<AuthData> {
    // Simular validação de credenciais
    const storedUsers = JSON.parse(
      localStorage.getItem("users") ?? "[]",
    ) as Array<User & { password: string }>;
    const user = storedUsers.find(
      (u: User & { password: string }) =>
        u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const authData: AuthData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: `token_${Math.random()}`,
    };

    this.setAuthData(authData);
    return authData;
  }

  static async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    const storedUsers = JSON.parse(
      localStorage.getItem("users") ?? "[]",
    ) as Array<User & { password: string }>;

    // Verificar se o email já existe
    if (storedUsers.some((u: User) => u.email === userData.email)) {
      throw new Error("Email já cadastrado");
    }

    const newUser = {
      id: `user_${Math.random()}`,
      ...userData,
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }

  static logout() {
    this.clearAuthData();
  }
}

export default AuthService;
