import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/app");
    }
  }, [auth, navigate]);

  return (
    <main className="min-h-screen flex flex-col text-black bg-white relative overflow-hidden">
      {/* Animated gradient blobs (light theme) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-black/10 rounded-full blur-[120px] animate-pulse"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-black/5 rounded-full blur-[150px] animate-pulse"
      ></motion.div>

      {/* Navbar */}
      <nav className="w-full py-4 px-8 flex justify-between items-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-extrabold tracking-tight text-black"
        >
          LeavePortal
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-x-3"
        >
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black/5"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-black text-white font-semibold hover:opacity-90"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-black"
        >
          Effortless Leave Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-10"
        >
          Apply, approve, and track employee leaves — all from one clean and intuitive portal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-4"
        >
          <Button
            size="lg"
            className="bg-black text-white font-semibold hover:opacity-90 shadow-xl"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-black text-black hover:bg-black/5 shadow-lg"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </motion.div>
      </section>

      <Separator className="my-12 bg-black/10" />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 w-full max-w-6xl mx-auto relative z-10">
        {[
          {
            title: "Live Tracking",
            desc: "Track leave balances, statuses, and history in real-time.",
          },
          {
            title: "Fast Approvals",
            desc: "Managers can approve or reject requests instantly.",
          },
          {
            title: "Simple UI",
            desc: "No clutter, no confusion — just clean leave management.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border border-black/10 shadow-md hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-gray-500 border-t border-black/10 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-black">LeavePortal</span>. All rights reserved.
      </footer>
    </main>
  );
}
