import { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import client from '../../config/client';
import { GetAppDocument } from '../../graphql/queries';
import IApp from '../../types/app';

type Props = {
  data: IApp;
};

type Params = {
  slug: string;
};

export default function AppPage(props: Props) {
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let SvelteComponent: any;

    const target = targetRef.current;

    if (target) {
      import('remote/index').then((module) => {
        SvelteComponent = new module.default({
          props,
          target,
        });
      });
    }

    return () => {
      if (SvelteComponent) {
        SvelteComponent.$destroy();
      }
    };
  }, [props]);

  const { name, description, slug, cover } = props.data;
  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="canonical" href={`${slug}.<domain>`} />
        <meta name="description" content={description} />

        {/* <!-- Open Graph --> */}
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={cover.url} />
        <meta property="og:site_name" content="" />
        <meta property="og:url" content={`${slug}.<domain>`} />
        <meta property="og:type" content="website" />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={cover.url} />

        {/* <!-- TODO: JSON LD --> */}
      </Head>

      <div ref={targetRef} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { slug } = Object.assign({ slug: '' }, params);
  const { app } = await client.request<{ app: IApp | null }, Params>(
    GetAppDocument,
    { slug }
  );

  if (!app) return { notFound: true };

  return { props: { data: app } };
};
