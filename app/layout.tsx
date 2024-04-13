import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="absolute inset-0 h-full w-full bg-[#ddbfad] bg-[radial-gradient(#a86a44_1px,transparent_1px)] [background-size:16px_16px]">
        <Header />
        <div className="max-w-[88rem] m-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
