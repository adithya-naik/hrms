import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  interface LocationState {
    from?: { pathname: string };
  }

  const location = useLocation() as unknown as { state: LocationState };
  const from = location.state?.from?.pathname || '/';
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    const result = await login(data.username, data.password);
    if (!result.success) {
      setError(result.error ?? 'Invalid username or password');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Leave Management Portal</CardTitle>
          <CardDescription>
            Sign in with your <b>username or email</b> and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="johndoe or john@company.com"
                        {...field}
                        disabled={isLoading}
                      />
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
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Your password"
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Contact your HR administrator
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
