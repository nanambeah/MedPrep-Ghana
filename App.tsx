import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Route, Switch } from "wouter";

import Auth from "./Auth";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Practice from "./Practice";
import Results from "./Results";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }

  // 🔒 Not logged in → show auth
  if (!user) {
    return <Auth />;
  }

  // 🔓 Logged in → real app pages
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/practice" component={Practice} />
      <Route path="/results" component={Results} />
      <Route>
        <div className="p-6">Page not found</div>
      </Route>
    </Switch>
  );
}
