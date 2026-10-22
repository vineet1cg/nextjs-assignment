import { getAvatarColor, getInitials } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-3xl",
} as const;

type AvatarSize = keyof typeof SIZE_CLASSES;

interface StudentAvatarProps {
  name: string;
  size?: AvatarSize;
}

export function StudentAvatar({ name, size = "md" }: StudentAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${SIZE_CLASSES[size]} ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </span>
  );
}
