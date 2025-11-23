"use client"

import { useEffect, useState } from "react";
import Papa from "papaparse";

type CSVRow = Record<string, string>;

export default function CSVComponent() {
  const [data, setData] = useState<CSVRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCSV() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/data.csv`, {
          cache: "no-store", // makes sure it refreshes
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch CSV: ${res.statusText}`);
        }

        const text = await res.text();

        const { data: parsedData } = Papa.parse<CSVRow>(text, {
          header: true,
          skipEmptyLines: true,
        });

        setData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load CSV');
      } finally {
        setLoading(false);
      }
    }

    loadCSV();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading CSV data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <p className="text-destructive font-semibold">Error loading CSV</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground text-lg">No data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="flex items-center space-x-2.5">
          <h1 className="text-3xl font-bold tracking-tight">CSV Data</h1>
          <a className="text-xs underline text-red-500" href="https://www.kaggle.com/datasets/shahriarkabir/procurement-kpi-analysis-dataset">Link</a>

          </span>
          <p className="text-muted-foreground">
            Displaying {data.length} {data.length === 1 ? 'record' : 'records'}
          </p>
        </div>

        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  {Object.keys(data[0]).map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-semibold text-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        className="px-4 py-3 text-muted-foreground"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
