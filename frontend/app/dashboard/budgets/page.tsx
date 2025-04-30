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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Plus, Pencil, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetCompliance,
} from "@/lib/axios";

// Available budget categories
const BUDGET_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Health",
  "Other",
];

// Colors for the pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
];

/**
 * Budgets Page Component
 * Allows users to create, view, and manage their budgets
 */
export default function BudgetsPage() {
  // State for budgets data
  const [budgets, setBudgets] = useState<
    { _id: string; category: string; amount: number }[]
  >([]);
  const [compliance, setCompliance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [complianceLoading, setComplianceLoading] = useState(true);

  // Dialog control state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);

  // Form state
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // Load budgets when component mounts
  useEffect(() => {
    fetchBudgets();
    fetchBudgetCompliance();
  }, []);

  /**
   * Fetch all budgets from the API
   */
  async function fetchBudgets() {
    try {
      setLoading(true);
      const response = await getBudgets();
      if (!Array.isArray(response?.data)) {
        throw new Error("Invalid response format");
      }
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Fetch budget compliance report
   */
  async function fetchBudgetCompliance() {
    try {
      setComplianceLoading(true);
      const response = await getBudgetCompliance();
      if (!Array.isArray(response?.data)) {
        throw new Error("Invalid response format");
      }
      setCompliance(response.data);
    } catch (error) {
      console.error("Error fetching budget compliance:", error);
    } finally {
      setComplianceLoading(false);
    }
  }

  /**
   * Reset form fields to default values
   */
  function resetForm() {
    setCategory("");
    setAmount("");
    setCurrentBudget(null);
  }

  /**
   * Handle edit button click
   * @param budget - The budget to edit
   */
  function handleEdit(budget) {
    setCurrentBudget(budget);
    setCategory(budget.category);
    setAmount(budget.amount.toString());
    setIsEditDialogOpen(true);
  }

  /**
   * Handle delete button click
   * @param budget - The budget to delete
   */
  function handleDelete(budget) {
    setCurrentBudget(budget);
    setIsDeleteDialogOpen(true);
  }

  /**
   * Add a new budget
   * @param e - Form submit event
   */
  async function handleAddBudget(e) {
    e.preventDefault();
    try {
      await createBudget({
        category,
        amount: parseFloat(amount),
      });
      fetchBudgets();
      fetchBudgetCompliance();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  }

  /**
   * Update an existing budget
   * @param e - Form submit event
   */
  async function handleUpdateBudget(e) {
    e.preventDefault();
    try {
      await updateBudget(currentBudget._id, {
        category,
        amount: parseFloat(amount),
      });
      fetchBudgets();
      fetchBudgetCompliance();
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  }

  /**
   * Delete a budget
   */
  async function handleDeleteBudget() {
    try {
      await deleteBudget(currentBudget._id);
      fetchBudgets();
      fetchBudgetCompliance();
      setIsDeleteDialogOpen(false);
      setCurrentBudget(null);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  }

  /**
   * Get compliance status class based on percentage
   * @param percentage - Compliance percentage
   * @returns CSS class name
   */
  function getComplianceStatusClass(percentage) {
    const numPercentage = parseFloat(percentage);
    if (numPercentage <= 80) return "text-green-600";
    if (numPercentage <= 100) return "text-yellow-600";
    return "text-red-600";
  }

  /**
   * Get compliance status icon based on percentage
   * @param percentage - Compliance percentage
   * @returns React element with appropriate icon
   */
  function getComplianceStatusIcon(percentage) {
    const numPercentage = parseFloat(percentage);
    if (numPercentage <= 80) {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
    if (numPercentage <= 100) {
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  }

  /**
   * Prepare data for pie chart
   * @returns Array of data objects for the pie chart
   */
  function getPieChartData() {
    return budgets.map((budget, index) => ({
      name: budget.category,
      value: budget.amount,
      color: COLORS[index % COLORS.length],
      id: budget._id,
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Page header with title and actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <div className="flex gap-2">
          {/* Add budget button and dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Budget</DialogTitle>
                <DialogDescription>
                  Set a budget limit for a specific category.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBudget}>
                <div className="grid gap-4 py-4">
                  {/* Category field */}
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Amount field */}
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Budget Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="1"
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Budget</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Budget List</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Report</TabsTrigger>
          <TabsTrigger value="chart">Budget Allocation</TabsTrigger>
        </TabsList>

        {/* Budget List Tab */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Your Budgets</CardTitle>
              <CardDescription>
                Manage your spending limits by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : budgets.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No budgets set</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Create budgets to help manage your spending
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create Your First Budget
                  </Button>
                </div>
              ) : (
                /* Budgets table */
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">
                        Budget Amount
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgets.map((budget) => (
                      <TableRow key={budget._id}>
                        <TableCell className="font-medium">
                          {budget.category}
                        </TableCell>
                        <TableCell className="text-right">
                          ${budget.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(budget)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(budget)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Report Tab */}
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Budget Compliance</CardTitle>
              <CardDescription>
                Track how well you're staying within your budgets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {complianceLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : compliance.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No compliance data</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Create budgets and record expenses to see compliance reports
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create a Budget
                  </Button>
                </div>
              ) : (
                /* Compliance report */
                <div className="space-y-6">
                  {compliance.map((item) => (
                    <div key={item._id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.category}</span>
                          {getComplianceStatusIcon(item.compliancePercentage)}
                        </div>
                        <div
                          className={cn(
                            "text-sm font-medium",
                            getComplianceStatusClass(item.compliancePercentage)
                          )}
                        >
                          {item.compliancePercentage}%
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          Spent: ${parseFloat(item.spentAmount).toFixed(2)}
                        </span>
                        <span>
                          Budget: ${parseFloat(item.budgetedAmount).toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(
                          parseFloat(item.compliancePercentage),
                          100
                        )}
                        className={cn(
                          "h-2",
                          parseFloat(item.compliancePercentage) > 100
                            ? "bg-red-200"
                            : ""
                        )}
                        indicatorClassName={cn(
                          parseFloat(item.compliancePercentage) <= 80
                            ? "bg-green-600"
                            : parseFloat(item.compliancePercentage) <= 100
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Allocation Chart Tab */}
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>
                Visual breakdown of your budget distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : budgets.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No budget data</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Create budgets to see your allocation chart
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    Create a Budget
                  </Button>
                </div>
              ) : (
                /* Pie chart */
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {getPieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Budget Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              Update your budget for this category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateBudget}>
            <div className="grid gap-4 py-4">
              {/* Category field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Amount field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Budget Amount ($)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="1"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Budget</Button>
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
              budget.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBudget}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
