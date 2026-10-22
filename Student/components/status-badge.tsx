import type { StudentStatus } from "@/lib/types";

const STATUS_STYLES: Record<StudentStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  on_leave: "bg-amber-100 text-amber-700",
  graduated: "bg-slate-200 text-slate-700",
};

const STATUS_LABELS: Record<StudentStatus, string> = {
  active: "Active",
  on_leave: "On leave",
  graduated: "Graduated",
};

interface StatusBadgeProps {
  status: StudentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
