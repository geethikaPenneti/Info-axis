
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must be at least 8 characters, contain uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const checkUserExists = (email: string) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return users.find((user: any) => user.email === email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!isLogin) {
      // Signup Process
      if (!validatePassword(password)) {
        toast.error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      // Check if user already exists
      if (checkUserExists(email)) {
        toast.error('Account with this email already exists. Please sign in instead.');
        return;
      }
      
      // Store user data for signup
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push({ email, password });
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      toast.success('Account created successfully! Please login with your credentials.');
      setIsLogin(true);
      setPassword('');
      setConfirmPassword('');
      return;
    }

    // Login Process - check against stored credentials
    const existingUser = checkUserExists(email);
    
    if (!existingUser) {
      toast.error('No account found with this email. Please sign up first.');
      return;
    }

    if (existingUser.password !== password) {
      toast.error('Invalid password. Please check your credentials.');
      return;
    }

    // Successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/b81f8737-b9e0-4ec4-a05c-e4147d047137.png" 
            alt="InfoAxis Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to InfoAxis
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to get the latest news and updates' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
              required
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">
                Must be 8+ characters with uppercase, lowercase, number, and special character (@$!%*?&)
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-blue-600 font-medium hover:text-blue-500 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};
