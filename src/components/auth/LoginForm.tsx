
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { account } from "../../../appwrite/appwrite";
import { ID } from 'appwrite';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const session = await account.createEmailPasswordSession(email, password);
      setSuccess('signed in successfully!');
      console.log('User:', session);
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);

    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-netflixGray border-netflixDarkGray">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-netflixDarkGray text-white border-netflixLightGray"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-netflixDarkGray text-white border-netflixLightGray"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-netflixRed hover:bg-netflixRed/90" disabled={loading}>
            {loading ? 'Loging in...' : 'Log in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
