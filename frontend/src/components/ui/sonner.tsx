import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      richColors
      expand={false}
      closeButton
      toastOptions={{
        duration: 3500,
        style: {
          background: "hsl(222 20% 10% / 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid hsl(222 20% 20%)",
          color: "hsl(210 40% 96%)",
          borderRadius: "12px",
          fontSize: "14px",
          fontFamily: "inherit",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
