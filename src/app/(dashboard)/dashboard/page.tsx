import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import prisma from "@/lib/db"; // Import your prisma instance
import { getSpreadsheets } from "@/lib/getSpreadsheets";
import { Button } from "@/components/ui/button";
import { createSpreadsheet } from "@/lib/createSpreadsheet";
import { User } from "next-auth";
import CreateNewSpreadsheet from "@/components/createNewSpreadsheet";
import SignOut from "@/components/sign-out";
import SpreadsheetList from "@/components/spreadsheetlist";
import Link from "next/link";

export default async function Dashboard() {
    const session = await auth();

    // If the user is not authenticated, redirect to the home page
    if (!session?.user) {
        redirect("/");
        return null; // Ensure the function exits after redirect
    }
    try {

    // Fetch the list of spreadsheets for the authenticated user
    const spreadsheets = await getSpreadsheets()
    // Render the dashboard with the list of spreadsheets
    return (
        <div>
            <div>
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-3xl font-bold">{session.user.name}</h1>
                    <div className="flex space-x-3">
                        <div>
                            <CreateNewSpreadsheet/>
                        </div>
                        <SignOut/>
                    </div>
                </div>
            </div>
            

            {/* If the user has spreadsheets, render them in a table */}
            {spreadsheets && spreadsheets.length > 0 ? (
                <div className="w-full p-3">
                   {spreadsheets.map((spreadsheet)=>(
                    <div className="hover:bg-slate-900 hover:text-slate-50 rounded-xl hover:cursor-pointer text-2xl p-5" key={spreadsheet.id}>
                        <Link href={`/sheet/${spreadsheet.id}`}><SpreadsheetList name={spreadsheet.name} updatedAt={spreadsheet.updatedAt.toLocaleString()}/></Link>
                    </div>
                   ))}
                </div>
            ) : (
                <p>No spreadsheets found</p>
            )}
        </div>
    );
} catch (error) {
    console.error("Error loading dashboard:", error);
    return <p>Failed to load dashboard</p>;
}
}
