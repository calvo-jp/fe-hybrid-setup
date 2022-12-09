import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
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

export default function AppPage({ data }: Props) {
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let component: any;

    import('remote/index').then((mod) => {
      if (targetRef.current) {
        component = new mod.default({
          target: targetRef.current,
          props: { data },
        });
      }
    });

    return () => {
      if (component) component.$destroy();
    };
  }, [data]);

  return (
    <>
      <Head>
        <title>{data.name}</title>

        {/* <!-- (seo) meta, jsonld, etc... --> */}
      </Head>

      <div ref={targetRef} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { apps } = await client.request<{ apps: { slug: string }[] }>(gql`
    query AppSlugs {
      apps {
        slug
      }
    }
  `);

  const paths = apps.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
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
