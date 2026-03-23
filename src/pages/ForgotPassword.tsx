import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Will connect to Supabase resetPasswordForEmail when Cloud is enabled
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
          <h1 className="text-2xl font-bold mt-4">Reset your password</h1>
          <p className="text-muted-foreground text-sm mt-1">
            We'll send you a link to reset it
          </p>
        </div>

        <div className="card-gradient rounded-2xl border border-border/40 p-8 shadow-lg">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button variant="hero" className="w-full py-5" type="submit">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Check your email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>
              </p>
              <Button variant="ghost" onClick={() => setSubmitted(false)}>
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
