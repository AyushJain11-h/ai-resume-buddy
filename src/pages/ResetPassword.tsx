import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, CheckCircle } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setDone(true);
    // Will connect to supabase.auth.updateUser when Cloud is enabled
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            ResumeLM
          </Link>
          <h1 className="text-2xl font-bold mt-4">Set new password</h1>
          <p className="text-muted-foreground text-sm mt-1">Choose a strong password</p>
        </div>

        <div className="card-gradient rounded-2xl border border-border/40 p-8 shadow-lg">
          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                />
                {password && confirm && password !== confirm && (
                  <p className="text-xs text-destructive">Passwords don't match</p>
                )}
              </div>
              <Button variant="hero" className="w-full py-5" type="submit" disabled={!password || password !== confirm}>
                Update Password
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Password updated!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can now sign in with your new password.
              </p>
              <Link to="/login">
                <Button variant="hero">Sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
