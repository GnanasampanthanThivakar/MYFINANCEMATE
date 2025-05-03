"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  Plus,
  Trash2,
  RefreshCw,
  Target,
  BarChart4,
  PieChart,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getSavingGoals,
  createSavingGoal,
  updateSavingGoalProgress,
  deleteSavingGoal,
} from "@/lib/axios";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

/**
 * Saving Goals Page Component
 * Allows users to create, view, and manage their savings goals
 */
export default function SavingGoalsPage() {
  // State for savings goals data
  const [savingsGoals, setSavingsGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updateAmount, setUpdateAmount] = useState("");

  // Dialog control state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<any | null>(null);

  // Form state
  const [goalAmount, setGoalAmount] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [goalName, setgoalName] = useState("");
  

  // Chart colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Load savings goals when component mounts
  useEffect(() => {
    fetchSavingsGoals();
  }, []);

  /**
   * Fetch all savings goals from the API
   */
  async function fetchSavingsGoals() {
    try {
      setLoading(true);
      const response = await getSavingGoals(); // Call your API function

      // Ensure the response contains the `data` property and it's an array
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      setSavingsGoals(response.data); // Set the data as an array
    } catch (error) {
      console.error("Error fetching savings goals:", error);
    } finally {
      setLoading(false);
    }
  }
  /**
   * Reset form fields to default values
   */
  function resetForm() {
    setGoalAmount("");
    setTargetDate(new Date());
    setUpdateAmount("");
    setCurrentGoal(null);
    setgoalName("");
  }

  /**
   * Handle update button click
   * @param goal - The goal to update
   */
  function handleUpdate(goal: any) {
    setCurrentGoal(goal);
    setUpdateAmount("");
    setIsUpdateDialogOpen(true);
  }

  /**
   * Handle delete button click
   * @param goal - The goal to delete
   */
  function handleDelete(goal: any) {
    setCurrentGoal(goal);
    setIsDeleteDialogOpen(true);
  }

  /**
   * Add a new savings goal
   * @param e - Form submit event
   */
  async function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Create new savings goal
      await createSavingGoal({
        goalAmount: Number.parseFloat(goalAmount),
        targetDate: targetDate.toISOString(),
      });
      





      // Refresh goals list and reset form
      fetchSavingsGoals();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  }

  /**
   * Update progress for a savings goal
   * @param e - Form submit event
   */
  async function handleUpdateProgress(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Update the savings goal progress
      await updateSavingGoalProgress(
        currentGoal._id,
        Number.parseFloat(updateAmount)
      );
      // Refresh goals list and reset form
      fetchSavingsGoals();
      setIsUpdateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating savings goal progress:", error);
    }
  }

  /**
   * Delete a savings goal
   */
  async function handleDeleteGoal() {
    try {
      // Delete the savings goal
      await deleteSavingGoal(currentGoal._id);
      // Refresh goals list and reset state
      fetchSavingsGoals();
      setIsDeleteDialogOpen(false);
      setCurrentGoal(null);
    } catch (error) {
      console.error("Error deleting savings goal:", error);
    }
  }

  /**
   * Calculate progress percentage for a goal
   * @param goal - The savings goal
   * @returns Progress percentage (0-100)
   */
  function calculateProgress(goal: any) {
    if (!goal?.goalAmount || goal.goalAmount <= 0) return 0;
    const currentAmount = goal?.currentAmount || 0;
    const progress = (currentAmount / goal.goalAmount) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ensure between 0-100
  }

  /**
   * Get status badge class based on goal status
   * @param status - Goal status
   * @returns CSS class name
   */
  function getStatusBadgeClass(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  }

  /**
   * Prepare data for pie chart
   */
  function getPieChartData() {
    return savingsGoals.map((goal, index) => ({
      name: `Goal ${index + 1}`,
      value: goal.goalAmount,
      fill: COLORS[index % COLORS.length],
    }));
  }

  /**
   * Prepare data for progress bar chart
   */
  function getProgressChartData() {
    return savingsGoals.map((goal, index) => ({
      name: `Goal ${index + 1}`,
      progress: calculateProgress(goal),
      fill: COLORS[index % COLORS.length],
    }));
  }

  /**
   * Prepare data for radial bar chart
   */
  function getRadialChartData() {
    return savingsGoals.map((goal, index) => ({
      name: `Goal ${index + 1}`,
      progress: calculateProgress(goal),
      fill: COLORS[index % COLORS.length],
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Page header with title and actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
        <div className="flex gap-2">
          {/* Add goal button and dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Savings Goal</DialogTitle>
                <DialogDescription>
                  Set a new financial goal to work towards.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddGoal}>

                <div className="grid gap-4 py-4">
                  {/* Goal amount field */}
                  <div className="grid gap-2">
                    <Label htmlFor="goalAmount">Goal Amount ($)</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 py-4">
                  {/* Goal amount field */}
                  <div className="grid gap-2">
                    <Label htmlFor="goalName">Goal Amount ()</Label>
                    <Input
                      id="goalName"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={goalName}
                      onChange={(e) => setgoalName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Target date field */}
                  <div className="grid gap-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !targetDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {targetDate
                            ? format(targetDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={targetDate}
                          onSelect={setTargetDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Goal</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Tabs for different views */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Goals List</TabsTrigger>
          <TabsTrigger value="progress">Progress Report</TabsTrigger>
          <TabsTrigger value="charts">Visualizations</TabsTrigger>
        </TabsList>
        {/* Goals List Tab */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Your Savings Goals</CardTitle>
              <CardDescription>
                Track your progress towards financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : savingsGoals.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Target className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No savings goals yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Set financial targets to help you save for important goals
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create Your First Goal
                  </Button>
                </div>
              ) : (
                /* Goals list */
                <div className="space-y-6">
                  {savingsGoals.map((goal) => (
                    <div key={goal._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-medium">
                            $
                            {goal?.goalAmount
                              ? goal.goalAmount.toFixed(2)
                              : "0.00"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Target date:{" "}
                            {goal?.targetDate
                              ? format(new Date(goal.targetDate), "PPP")
                              : "No date"}{" "}
                            (
                            {goal?.targetDate
                              ? formatDistanceToNow(new Date(goal.targetDate), {
                                  addSuffix: true,
                                })
                              : ""}
                            )
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              getStatusBadgeClass(goal.status)
                            )}
                          >
                            {goal.status === "in-progress"
                              ? "In Progress"
                              : goal.status === "completed"
                              ? "Completed"
                              : "Expired"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => handleUpdate(goal)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => handleDelete(goal)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            $
                            {goal?.currentAmount
                              ? goal.currentAmount.toFixed(2)
                              : "0.00"}{" "}
                            of $
                            {goal?.goalAmount
                              ? goal.goalAmount.toFixed(2)
                              : "0.00"}
                          </span>
                        </div>
                        <Progress
                          value={calculateProgress(goal)}
                          className="h-2"
                        />
                      </div>
                      {/* Created date */}
                      <p className="text-xs text-muted-foreground mt-4">
                        Created{" "}
                        {goal?.createdAt
                          ? format(new Date(goal.createdAt), "PP")
                          : "Unknown date"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Progress Report Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Savings Progress Report</CardTitle>
              <CardDescription>
                Detailed view of your progress towards each goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : savingsGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BarChart4 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No goals to report</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Add savings goals to see your progress report
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create a Goal
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Summary statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Total Goals
                      </h3>
                      <p className="text-2xl font-bold mt-1">
                        {savingsGoals.length}
                      </p>
                    </div>
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Completed Goals
                      </h3>
                      <p className="text-2xl font-bold mt-1 text-green-600">
                        {
                          savingsGoals.filter(
                            (goal) => goal.status === "completed"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        In Progress Goals
                      </h3>
                      <p className="text-2xl font-bold mt-1 text-blue-600">
                        {
                          savingsGoals.filter(
                            (goal) => goal.status === "in-progress"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                  {/* Detailed progress table */}
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium">
                            Goal
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium">
                            Target Date
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium">
                            Progress
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {savingsGoals.map((goal, index) => {
                          const progress = calculateProgress(goal);
                          return (
                            <tr key={goal._id || index}>
                              <td className="px-4 py-3 text-sm">
                                Goal {index + 1}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {goal?.targetDate &&
                                !isNaN(new Date(goal.targetDate).getTime())
                                  ? format(new Date(goal.targetDate), "PP")
                                  : "No date"}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    getStatusBadgeClass(goal.status)
                                  )}
                                >
                                  {goal.status === "in-progress"
                                    ? "In Progress"
                                    : goal.status === "completed"
                                    ? "Completed"
                                    : "Expired"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
                                  <div
                                    className={cn(
                                      "h-2.5 rounded-full",
                                      progress >= 100
                                        ? "bg-green-600"
                                        : progress >= 50
                                        ? "bg-blue-600"
                                        : "bg-yellow-400"
                                    )}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs mt-1 inline-block">
                                  {progress.toFixed(1)}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                $
                                {goal?.currentAmount
                                  ? goal.currentAmount.toFixed(2)
                                  : "0.00"}{" "}
                                / $
                                {goal?.goalAmount
                                  ? goal.goalAmount.toFixed(2)
                                  : "0.00"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Visualizations Tab */}
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle>Savings Visualizations</CardTitle>
              <CardDescription>
                Visual representation of your savings goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : savingsGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No data to visualize</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Add savings goals to see visualizations
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create a Goal
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Progress Gauge Chart */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Goal Progress</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          innerRadius="10%"
                          outerRadius="80%"
                          data={getRadialChartData()}
                          startAngle={180}
                          endAngle={0}
                        >
                          <RadialBar
                            minAngle={15}
                            label={{ fill: "#666", position: "insideStart" }}
                            background
                            clockWise={true}
                            dataKey="progress"
                          />
                          <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                          />
                          <Tooltip
                            formatter={(value) => `${value.toFixed(1)}%`}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Goal Amounts Pie Chart */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Goal Amounts Distribution
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={getPieChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {getPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => `$${value.toFixed(2)}`}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Progress Bar Chart */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Progress Comparison
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getProgressChartData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip
                            formatter={(value) => `${value.toFixed(1)}%`}
                          />
                          <Legend />
                          <Bar dataKey="progress" name="Progress %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Update Progress Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Goal Progress</DialogTitle>
            <DialogDescription>
              Add to your current savings amount.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProgress}>
            <div className="grid gap-4 py-4">
              {currentGoal && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Current progress: ${currentGoal.currentAmount?.toFixed(2)}{" "}
                    of ${currentGoal.goalAmount?.toFixed(2)}
                  </p>
                  <Progress
                    value={calculateProgress(currentGoal)}
                    className="h-2"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="updateAmount">Amount to Add ($)</Label>
                <Input
                  id="updateAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Progress</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              savings goal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGoal}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
