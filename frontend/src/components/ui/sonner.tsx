import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      richColors={false}
      expand={true}
      closeButton
      toastOptions={{
        duration: 5000,
        className: "group toast",
        style: {
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          color: "#1e293b",
          borderRadius: "12px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          minWidth: "300px",
        },
        success: {
          style: {
            background: "#f0fdf4",
            borderColor: "#bbf7d0",
            color: "#15803d",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            borderColor: "#fecaca",
            color: "#b91c1c",
          },
        },
        info: {
          style: {
            background: "#eff6ff",
            borderColor: "#dbeafe",
            color: "#1d4ed8",
          },
        },
        warning: {
          style: {
            background: "#fffbeb",
            borderColor: "#fef3c7",
            color: "#b45309",
          },
        },
        classNames: {
          toast: "group toast flex items-center w-full",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "group-[.toast]:bg-transparent group-[.toast]:text-current group-[.toast]:border-none group-[.toast]:hover:bg-black/5",
          // The image shows an icon inside a colored box. We can achieve this by styling the icon container.
          icon: "flex items-center justify-center w-8 h-8 rounded-lg text-white mr-2",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
