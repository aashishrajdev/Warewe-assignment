"use client";

import { useState } from "react";
import RequestForm from "@/components/RequestForm";
import ResponseDisplay from "@/components/ResponseDisplay";
import { useQuery } from "@tanstack/react-query";

type ResponseData = {
  data: unknown;
  headers: Record<string, string>;
  status: number;
  duration: number;
};

export default function Home() {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: history } = useQuery({
    queryKey: ["requestHistory"],
    queryFn: async () => {
      const response = await fetch("/api/request");
      return response.json();
    },
  });

  const handleSubmit = async (data: {
    method: string;
    url: string;
    headers: { key: string; value: string }[];
    body: string;
  }) => {
    setIsLoading(true);
    try {
      const headers = data.headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: data.method,
          url: data.url,
          headers,
          body: data.body ? JSON.parse(data.body) : undefined,
        }),
      });

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error("Error making request:", error);
      setResponse({
        data: { error: "Failed to make request" },
        headers: {},
        status: 500,
        duration: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">REST Client</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <RequestForm onSubmit={handleSubmit} isLoading={isLoading} />
          {response && (
            <ResponseDisplay
              data={response.data}
              headers={response.headers}
              status={response.status}
              duration={response.duration}
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Request History</h2>
          <div className="space-y-4">
            {history?.requests?.map((request: any) => (
              <div
                key={request.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{request.method}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{request.url}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Status: {request.statusCode} • Time: {request.duration}ms
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
