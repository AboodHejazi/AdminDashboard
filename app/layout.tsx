// // app/layout.tsx
// import Navbar from "./dashboard/components/common/sidebar";
// import Sidebar from "./dashboard/components/common/sidebar";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100 antialiased">
//         <div className="flex min-h-screen">
//           {/* الـ Sidebar ثابت هنا */}
//           <Navbar />
          
//           {/* المحتوى يتغير هنا */}
//           <main className="flex-1 overflow-y-auto">
//             {children}
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import Navbar from "./dashboard/components/common/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased">
        <div className="min-h-screen">
          {/* الـ Navbar يكون في الأعلى دائماً */}
          <Navbar />
          
          {/* المحتوى يظهر تحت الـ Navbar مباشرة */}
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}