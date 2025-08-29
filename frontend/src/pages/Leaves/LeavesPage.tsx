// src/pages/LeavesPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useGetLeavesQuery } from "@/store/api/leaveApi";
import { useMemo } from "react";

export default function LeavesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // read URL params
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const status = queryParams.get("status") || undefined;
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);

  // query RTK
  const { data, isLoading, isError } = useGetLeavesQuery({ status, page, limit });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load leaves.</p>;

  const leaves = data?.leaves ?? [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(newPage));
    navigate(`/leaves?${params.toString()}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {status ? `${status} Leaves` : "All Leaves"}
      </h1>

      {leaves.length > 0 ? (
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div key={leave.id} className="border rounded-lg p-4 shadow-sm">
              <p className="font-medium">
                {leave.leaveType} ({leave.status})
              </p>
              <p className="text-sm text-gray-500">
                {new Date(leave.startDate).toDateString()} →{" "}
                {new Date(leave.endDate).toDateString()}
              </p>
              <p className="text-sm">{leave.totalDays} days</p>
              {leave.requester && (
                <p className="text-sm">
                  By: {leave.requester.firstName} {leave.requester.lastName}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No leaves found.</p>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
