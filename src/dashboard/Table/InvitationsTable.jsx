import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const InvitationsTable = ({ data }) => {
  // Ensure `data` is always an array
  const safeData = Array.isArray(data) ? data : [];

  // Create column helper
  const columnHelper = createColumnHelper();

  // Define columns
  const columns = [
    columnHelper.accessor("inviteeEmail", {
      header: "Email",
      cell: (info) => <span className="text-white/70">{info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "accepted"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {status}
          </span>
        );
      },
    }),
  ];

  // Filter pending invitations
  const filteredData = safeData.filter((item) => item.status !== "accepted");

  // React Table Hook (MUST be at the top level)
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // If no data, show message (after hooks are called)
  if (filteredData.length === 0) {
    return (
      <div className="py-4 text-center text-white/60">No invitations found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-left text-[#9DA1B3]/70 border-b border-violet-500/40"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-4 font-medium">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-violet-500/20 hover:bg-[#251761]/30 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitationsTable;