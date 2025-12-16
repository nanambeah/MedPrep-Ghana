import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const signUp = async () => {
    setStatus("Signing up...");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setStatus(error ? error.message : "Signup successful ✅");
  };

  const signIn = async () => {
    setStatus("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setStatus(error ? error.message : "Login successful 🎉");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">MedPrep Ghana</h2>
          <p className="text-sm text-gray-500 mt-1">Supabase Connection Test</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={signUp}
            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors font-medium"
          >
            Sign Up
          </button>
          <button 
            onClick={signIn}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>

        {status && (
          <div className={`p-3 rounded-md text-sm font-medium text-center ${
            status.includes("successful") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
