import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircleUserRound } from "lucide-react";

const ClientsTable = ({ data }) => {
  // console.log("data from clients table", data);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("inviteeEmail", {
      // Updated from "email" to "inviteeEmail"
      header: "Email",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <CircleUserRound className="w-5 h-5 text-blue-400" />
          <span className="text-white/70">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      // Updated from "name" to "inviteeName"
      header: "status",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <span className="text-green-500">{info.getValue()}</span>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="py-4 text-center text-white/60">No clients found</div>
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

export default ClientsTable;