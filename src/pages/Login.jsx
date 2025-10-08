import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const GoogleIcon = (props) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isTeacher: false
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    if (!error) {
      toast({
        title: "Welcome back! 🎉",
        description: "You've successfully signed in to your account.",
      });
    }
    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(registerData.email, registerData.password, registerData.name, registerData.isTeacher);
    
    if (!error) {
      // The user will be shown a toast to check their email from the signUp function.
      // No navigation here, as the user needs to verify their email.
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogle();
    // The onAuthStateChange listener will handle navigation
    // No need to setIsGoogleLoading(false) here as the page will redirect
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRegisterData({
      ...registerData,
      [e.target.name]: value
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to ReadNow
          </h1>
          <p className="text-white/80">
            Sign in to track your progress or create a new account to get started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="reading-card">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                  Create Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-yellow-300" />
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="Your password"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-white/60 backdrop-blur-sm">Or continue with</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-white border-white/20 bg-white/10 hover:bg-white/20"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    Google
                  </Button>
                </CardContent>
              </TabsContent>

              <TabsContent value="register">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-yellow-300" />
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-name" className="text-white">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="register-name"
                          name="name"
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="register-password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="register-password"
                          name="password"
                          type="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="Create a password"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-confirm-password" className="text-white">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                        <Input
                          id="register-confirm-password"
                          name="confirmPassword"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="isTeacher"
                        name="isTeacher"
                        type="checkbox"
                        checked={registerData.isTeacher}
                        onChange={handleRegisterChange}
                        className="rounded border-white/20 bg-white/10"
                      />
                      <Label htmlFor="isTeacher" className="text-white text-sm">
                        I am a teacher/educator
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-white/60 backdrop-blur-sm">Or continue with</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-white border-white/20 bg-white/10 hover:bg-white/20"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    Google
                  </Button>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-white/60 text-sm">
            By creating an account, you agree to our{' '}
            <Link to="#" className="text-yellow-300 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-yellow-300 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;