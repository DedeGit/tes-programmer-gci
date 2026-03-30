import "./globals.css";

export const metadata = {
  title: "GCI Dashboard",
  description: "Simple Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        {children}
      </body>
    </html>
  );
}