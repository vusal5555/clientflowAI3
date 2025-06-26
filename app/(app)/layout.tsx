import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import AppLayoutClient from "./AppLayoutClient";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppLayoutClient>{children}</AppLayoutClient>
    </ThemeProvider>
  );
};

export default AppLayout;
