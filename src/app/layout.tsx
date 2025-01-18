import React from 'react';
import './globals.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        />
      </head>
      <body className="font-[Press Start 2P]">
        {children}
      </body>
    </html>
  );
}
