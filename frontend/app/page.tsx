"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  CreditCard,
  Shield,
  Smartphone,
  Zap,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/register?email=${encodeURIComponent(email)}`;
  };

  // Testimonial data
  const testimonials = [
    {
      quote:
        "MyFinanceMate has completely transformed how I manage my finances. I've saved over $5,000 in just 6 months by tracking my expenses and setting realistic budgets.",
      author: "Nazriya kumaran",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "The insights feature is incredible. It helped me identify spending patterns I wasn't aware of and gave me actionable advice to improve my financial health.",
      author: "Vijay Kumar",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "As a freelancer with irregular income, this app has been a game-changer. I can now confidently plan for the future and have peace of mind about my finances.",
      author: "Priya Gnanasekaran",
      role: "Freelance Designer",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MyFinanceMate</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block">
              <Button variant="ghost" className="font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-medium">Get Started</Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
              <Link
                href="#features"
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
          {/* Background gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-fixed opacity-5"></div>

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
                  <span>✨ Your personal finance companion</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Smart Money Management{" "}
                  <span className="text-primary">Made Simple</span>
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Take control of your finances with powerful tracking,
                  budgeting, and insights. All in one beautiful dashboard.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button size="lg" className="font-semibold">
                      Start for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-semibold"
                    >
                      See How It Works
                    </Button>
                  </Link>
                </div>

                <div className="mt-10">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0"
                  >
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md"
                        required
                      />
                    </div>
                    <Button type="submit" className="whitespace-nowrap">
                      Get Started
                    </Button>
                  </form>
                </div>

                <div className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative mx-auto max-w-[600px]">
                  <div className="relative shadow-2xl rounded-xl overflow-hidden border bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                      alt="MyFinanceMate Dashboard Preview"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold">
                          Powerful Dashboard
                        </h3>
                        <p className="text-sm opacity-90">
                          Track, analyze, and optimize your finances in one
                          place
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 bg-card shadow-lg rounded-lg border p-4 w-48 hidden md:block">
                    <div className="text-sm font-medium">Monthly Savings</div>
                    <div className="text-2xl font-bold text-primary mt-1">
                      $1,248.42
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      +12.5% from last month
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-lg border p-4 w-48 hidden md:block">
                    <div className="text-sm font-medium">Expense Breakdown</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <div className="text-xs">Housing (35%)</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                      <div className="text-xs">Food (25%)</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      <div className="text-xs">Transport (15%)</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="border-y bg-muted/30 py-10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground">
                TRUSTED BY THOUSANDS OF USERS
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-6 opacity-70 grayscale"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google"
                className="h-6 opacity-70 grayscale"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix"
                className="h-6 opacity-70 grayscale"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="h-6 opacity-70 grayscale"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="h-6 opacity-70 grayscale"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to take control of your finances in one
                place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="mt-2 text-muted-foreground">
                  Easily track and categorize all your expenses in one place.
                  Get insights into your spending habits.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Income Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Monitor all your income sources and understand your cash flow
                  better than ever before.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visual Reports</h3>
                <p className="mt-2 text-muted-foreground">
                  Beautiful charts and graphs that help you visualize your
                  financial data at a glance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Financial Health</h3>
                <p className="mt-2 text-muted-foreground">
                  Get a comprehensive score of your financial health with
                  personalized recommendations for improvement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mobile Friendly</h3>
                <p className="mt-2 text-muted-foreground">
                  Access your financial data on the go with our responsive
                  design that works on any device.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Insights</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive personalized insights and recommendations to improve
                  your financial habits.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Screenshot Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Beautiful Interface
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                An intuitive dashboard designed to make financial management a
                breeze
              </p>
            </div>

            <div className="relative mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden border shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Dashboard Interface"
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Feature callouts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute top-10 left-0 lg:-left-16 bg-card p-4 rounded-lg border shadow-lg max-w-[250px] hidden lg:block"
              >
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="bg-primary/20 text-primary p-1 rounded">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  Interactive Charts
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Visualize your finances with beautiful, interactive charts
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-1/3 right-0 lg:-right-16 bg-card p-4 rounded-lg border shadow-lg max-w-[250px] hidden lg:block"
              >
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="bg-primary/20 text-primary p-1 rounded">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  Financial Insights
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get personalized recommendations to improve your finances
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-card p-4 rounded-lg border shadow-lg max-w-[300px] hidden lg:block"
              >
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="bg-primary/20 text-primary p-1 rounded">
                    <Shield className="h-4 w-4" />
                  </span>
                  Financial Health Score
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your overall financial health with our comprehensive
                  scoring system
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Getting started with MyFinanceMate is easy and takes just
                minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-card rounded-xl border p-6 text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                    <span className="text-lg font-bold text-primary-foreground">
                      1
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p className="mt-2 text-muted-foreground">
                    Sign up for free in less than a minute. No credit card
                    required to get started.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Create Account"
                    className="mt-4 rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                  <ChevronRight className="h-8 w-8 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-card rounded-xl border p-6 text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                    <span className="text-lg font-bold text-primary-foreground">
                      2
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">Track Your Finances</h3>
                  <p className="mt-2 text-muted-foreground">
                    Add your income and expenses. Set up budgets and saving
                    goals to stay on track.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Track Finances"
                    className="mt-4 rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                  <ChevronRight className="h-8 w-8 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-card rounded-xl border p-6 text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                    <span className="text-lg font-bold text-primary-foreground">
                      3
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">Get Insights</h3>
                  <p className="mt-2 text-muted-foreground">
                    Receive personalized insights and recommendations to improve
                    your financial health.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Get Insights"
                    className="mt-4 rounded-lg w-full h-40 object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/register">
                <Button size="lg" className="font-semibold">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of users who have transformed their financial
                lives
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto px-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    scale: activeTestimonial === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "absolute inset-0 bg-card rounded-xl border p-8 shadow-md",
                    activeTestimonial === index
                      ? "relative"
                      : "pointer-events-none"
                  )}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/20"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-lg italic mb-4">{testimonial.quote}</p>
                      <div>
                        <h4 className="font-bold text-lg">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Testimonial navigation dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "h-3 w-3 rounded-full transition-colors",
                      activeTestimonial === index
                        ? "bg-primary"
                        : "bg-primary/30"
                    )}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                No hidden fees or complicated tiers. Just straightforward
                pricing for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 max-w-5xl mx-auto px-4">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">$0</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Perfect for individuals just starting their financial
                    journey.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Basic expense tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Income management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Monthly reports</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link href="/register">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-primary shadow-md overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">$9.99</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    For individuals who want to optimize their finances.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Everything in Free</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Budget planning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Financial goals</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link href="/register">
                      <Button className="w-full" variant="default">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Business Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Business</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">$29.99</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    For small businesses and teams managing finances together.
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Everything in Pro</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Business reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3">Priority support</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link href="/register">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Find answers to common questions about MyFinanceMate
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-6"
              >
                <h3 className="text-lg font-semibold">
                  Is my financial data secure?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we take security very seriously. All your data is
                  encrypted and we use industry-standard security measures to
                  protect your information. We never share your data with third
                  parties without your explicit consent.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-6"
              >
                <h3 className="text-lg font-semibold">
                  Can I cancel my subscription anytime?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  You can cancel your subscription at any time with no questions
                  asked. If you cancel, you'll continue to have access until the
                  end of your billing period.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-6"
              >
                <h3 className="text-lg font-semibold">
                  Do you offer a mobile app?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  While we don't have a native mobile app yet, our web
                  application is fully responsive and works great on mobile
                  devices. You can add it to your home screen for a app-like
                  experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-6"
              >
                <h3 className="text-lg font-semibold">
                  Can I import data from other financial apps?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we support importing data from CSV files and several
                  popular financial applications. This makes it easy to
                  transition to MyFinanceMate without losing your historical
                  data.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start Your Financial Journey Today
              </h2>
              <p className="mt-4 text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of users who have transformed their relationship
                with money.
              </p>
              <div className="mt-8">
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-semibold"
                  >
                    Create Your Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">MyFinanceMate</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Take control of your finances with our powerful and easy-to-use
                finance tracker.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} MyFinanceMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
