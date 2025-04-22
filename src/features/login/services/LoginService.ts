// features/login/services/authService.ts daleee
export const login = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@demo.com" && password === "123456") {
          resolve({ email, name: "Administrador" })
        } else {
          reject(new Error("Credenciales inválidas"))
        }
      }, 1000)
    })
  }
  
  
  // features/login/index.ts
  export { default as LoginPage } from "../pages/loginPage"