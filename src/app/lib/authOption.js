import CredentialsProvider from "next-auth/providers/credentials";
import { LogInUser } from "@/action/server/auth";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
     CredentialsProvider({
   
    name: 'Credentials',
    
    credentials: {
    //   username: { label: "Username", type: "text", placeholder: "jsmith" },
    //   password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
       
        const result = await LogInUser(credentials);
        if(result.success){
            return result.user;
        }
        else{
            return null;
        }
    }
  }),
    // ...add more providers here
  ],
};
