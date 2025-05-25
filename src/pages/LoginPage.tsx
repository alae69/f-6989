
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the schema for the login form
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Define the form with React Hook Form and Zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Mock authentication - In a real app, you'd call an API here
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock user authentication - For demo only
      // In real application, this would be handled through API and tokens
      if (data.username === "admin" && data.password === "password123") {
        // Admin login
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: "Admin login successful",
          description: "Welcome back, Admin!",
        });
        navigate("/admin");
      } else if (data.username === "user" && data.password === "password123") {
        // Regular user login
        localStorage.setItem("userRole", "user");
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/");
      } else {
        // Invalid credentials
        toast({
          title: "Login failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-moroccan-blue text-white p-2 rounded">
              <span className="font-serif text-lg">M</span>
            </div>
            <div className="font-serif text-xl text-moroccan-blue">
              <span>Martil</span>
              <span className="text-moroccan-gold">Haven</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-moroccan-blue hover:bg-moroccan-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            For demo purposes:<br />
            Admin: admin / password123<br />
            User: user / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
