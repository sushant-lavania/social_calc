import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import prisma from "@/lib/db"; // Import your prisma instance
import { getSpreadsheets } from "@/lib/getSpreadsheets";
import { Button } from "@/components/ui/button";
import { createSpreadsheet } from "@/lib/createSpreadsheet";
import { User } from "next-auth";
import CreateNewSpreadsheet from "@/components/createNewSpreadsheet";

export default async function Dashboard() {
    try {
    const session = await auth();

    // If the user is not authenticated, redirect to the home page
    if (!session?.user) {
        redirect("/");
        return null; // Ensure the function exits after redirect
    }

    // Fetch the list of spreadsheets for the authenticated user
    const spreadsheets = await getSpreadsheets()
    // Render the dashboard with the list of spreadsheets
    return (
        <div>
            <h1>Dashboard</h1>
            <CreateNewSpreadsheet/>
            

            {/* If the user has spreadsheets, render them in a table */}
            {spreadsheets && spreadsheets.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spreadsheets.map((spreadsheet) => (
                            <tr key={spreadsheet.id}>
                                <td>{spreadsheet.name}</td>
                                <td>{new Date(spreadsheet.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(spreadsheet.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
