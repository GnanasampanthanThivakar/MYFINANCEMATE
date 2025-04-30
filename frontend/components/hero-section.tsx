"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the email signup here
    window.location.href = `/register?email=${encodeURIComponent(email)}`
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Take Control of Your <span className="text-primary">Finances</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Track expenses, manage income, and visualize your financial journey with our powerful and easy-to-use
              finance tracker.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="font-semibold">
                  Get Started for Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="font-semibold">
                  Log in
                </Button>
              </Link>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
                <Button type="submit" className="whitespace-nowrap">
                  Sign Up with Email
                </Button>
              </form>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">Free forever. No credit card required.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[500px]">
              <div className="relative shadow-xl rounded-xl overflow-hidden border bg-card">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="FinTrack Dashboard Preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Beautiful Analytics Dashboard</h3>
                    <p className="text-sm opacity-90">Visualize your finances with intuitive charts and reports</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-card shadow-lg rounded-lg border p-4 w-48">
                <div className="text-sm font-medium">Monthly Savings</div>
                <div className="text-2xl font-bold text-primary mt-1">$1,248.42</div>
                <div className="text-xs text-muted-foreground mt-1">+12.5% from last month</div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-lg border p-4 w-48">
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
  )
}

