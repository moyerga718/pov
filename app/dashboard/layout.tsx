export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      /{/* Include shared stuff here, like a nav bar */}
      {children}
    </section>
  );
}
