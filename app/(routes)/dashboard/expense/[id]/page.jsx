"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import TargetBudget from "../_components/TargetBudget";
import BudgetItem from "../../budget/_components/BudgetItem";
import Addexpens from "../_components/Addexpens";
import ExpenseLits from "../_components/ExpenseLits";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const Expense = ({ params }) => {
  const { user } = useUser();
  const route = useRouter();

  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  //const [percentage, setPercentage] = useState();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalItem: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalSpend: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createBy, user?.user?.primaryEmailAddress?.emailAddress)
      )
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesInfo();
    // const bud = result[0];

    // const per = (bud.amount/bud.totalSpend)*100;
    // const perc = Math.round(per);

    //  setPercentage(perc);
    //   console.log(result[0].amount);
  };

  //? getExpenses Data Under Same Budget

  const getExpensesInfo = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    // return result;
    setExpenseData(result);

    //console.log(result);
  };

  //? Delete Budget and expenses from database

  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      if (result) {
        toast("Budget Deleted Succesfully !!");
        route.replace("/dashboard/budget");
      }
    }
  };
  //console.log(expenseData);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold"> My Expenses </h2>
          <div className="flex gap-2">
            
          <EditBudget  refreshData={()=> getBudgetInfo() } budgetInfo={budgetInfo}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 bg-red-400">
                {" "}
                <Trash /> Delete{" "}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget and expenses and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
          
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-3">
          {<BudgetItem budget={budgetInfo} />}
          <div>
            <Addexpens
              refreshData={() => getBudgetInfo()}
              budgetId={params.id}
              user={user}
            />
          </div>
        </div>

        <ExpenseLits
          expenselist={expenseData}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </>
  );
};

export default Expense;
