import { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Source+Serif+Pro:wght@400;600;700;900&display=swap"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
