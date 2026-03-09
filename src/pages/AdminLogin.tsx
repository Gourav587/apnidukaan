import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Mail, Lock, BarChart3, Package, Users, Zap } from "lucide-react";
import { useRateLimit } from "@/hooks/use-rate-limit";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const loginRate = useRateLimit();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRate.isLocked) {
      toast.error(`Too many attempts. Try again in ${loginRate.cooldownSeconds}s`);
      return;
    }
    setLoading(true);

    const { data: authData, error } = await supabase.auth.signInWithPassword(form);
    if (error) {
      loginRate.recordAttempt();
      setLoading(false);
      toast.error(error.message);
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      loginRate.recordAttempt();
      setLoading(false);
      toast.error("Access denied. Admin privileges required.");
      return;
    }

    loginRate.resetAttempts();
    setLoading(false);
    toast.success("Welcome back, Admin!");
    navigate("/admin");
  };

  const features = [
    { icon: BarChart3, label: "Real-time Analytics", desc: "Track sales & revenue" },
    { icon: Package, label: "Inventory Management", desc: "Stock alerts & updates" },
    { icon: Users, label: "Customer Management", desc: "Orders & wholesale" },
    { icon: Zap, label: "Quick POS", desc: "Walk-in billing system" },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Panel: Hero/Brand Area */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-12 xl:p-20 overflow-hidden bg-zinc-950 dark:bg-background">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50 dark:opacity-30 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-50" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 dark:bg-primary/10 border border-white/20 dark:border-primary/20 backdrop-blur-md shadow-inner">
              <Shield className="h-6 w-6 text-white dark:text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-heading tracking-tight">ApniDukaan</h1>
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest mt-0.5">Workspace</p>
            </div>
          </div>

          {/* Hero Copy */}
          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] font-heading tracking-tight">
            Control your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">operations</span> <br />with precision.
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-md leading-relaxed">
            The all-in-one command center for inventory, analytics, and customer management. Built for speed.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 p-5 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 mb-4 transition-transform group-hover:scale-110 duration-300 shadow-sm">
                  <f.icon className="h-5 w-5 text-zinc-100" />
                </div>
                <p className="text-sm font-semibold text-zinc-100">{f.label}</p>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-background">
        {/* Mobile Logo Header */}
        <div className="lg:hidden absolute top-8 left-0 right-0 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Shield className="h-5 w-5 text-primary" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-heading text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your admin workspace</p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border bg-card/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/40">
            <form onSubmit={handleLogin} className="space-y-6">

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground/80">Work Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type="email"
                    className="h-12 rounded-xl border-input bg-background/50 pl-10 text-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary shadow-sm"
                    placeholder="admin@apnidukaan.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-foreground/80">Security Key</Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="h-12 rounded-xl border-input bg-background/50 pl-10 pr-12 text-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary shadow-sm"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginRate.isLocked && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-lg bg-destructive/10 p-3 text-center border border-destructive/20">
                  <p className="text-xs font-medium items-center justify-center flex gap-1.5 text-destructive">
                    <Shield className="h-3.5 w-3.5" />
                    Security lock: Try again in {loginRate.cooldownSeconds}s
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                disabled={loading || loginRate.isLocked}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Authenticating...
                  </span>
                ) : (
                  "Access Workspace"
                )}
              </Button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs font-medium text-muted-foreground/60 flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" />
            Secure endpoint • ApniDukaan © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
