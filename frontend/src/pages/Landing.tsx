import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/app");
    }
  }, [auth, navigate]);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold tracking-tight">LeavePortal</h1>
        <div className="space-x-3">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Effortless Leave Management
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10">
          Apply, approve, and track employee leaves — all from one clean and intuitive portal.
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started →
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
            Create Account
          </Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 w-full max-w-6xl mx-auto">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track leave balances, statuses, and history in real-time.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Fast Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Managers can approve or reject requests instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Simple UI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No clutter, no confusion — just clean leave management.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} LeavePortal. All rights reserved.
      </footer>
    </main>
  );
}
