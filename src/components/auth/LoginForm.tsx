
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration will be added later
    console.log('Login attempted');
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
              className="bg-netflixDarkGray text-white border-netflixLightGray"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="bg-netflixDarkGray text-white border-netflixLightGray"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-netflixRed hover:bg-netflixRed/90">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
