declare module 'react-helmet-async' {
  import * as React from 'react';

  export interface HelmetProps extends React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> {}

  export const Helmet: React.FC<React.PropsWithChildren<unknown>>;
  export const HelmetProvider: React.FC<React.PropsWithChildren<{ context?: any }>>;
}

