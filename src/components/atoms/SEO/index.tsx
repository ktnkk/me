import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { color } from '@/theme';
import type React from 'react';
import type { FC } from 'react';

type SEOProps = {
  pageTitle: string;
  pageDescription: string;
  articleSection: string;
  articleTags: string[];
};

const SEO: FC<Partial<SEOProps>> = ({
  pageTitle,
  pageDescription,
  articleSection,
  articleTags,
}) => {
  const { site } = useStaticQuery<GatsbyTypes.SEOQuery>(
    graphql`
      query SEO {
        site {
          siteMetadata {
            siteTitle
            siteUrl
            siteDescription
            author
            copyright
            image
            social {
              twitter
              github
            }
          }
        }
      }
    `,
  );

  const { pathname } = useLocation();

  const seo = {
    siteTitle: site?.siteMetadata?.siteTitle,
    title: pageTitle
      ? `${pageTitle} | ${site?.siteMetadata?.siteTitle as string}`
      : site?.siteMetadata?.siteTitle,
    siteUrl: site?.siteMetadata?.siteUrl,
    themeColor: color.base,
    description: pageDescription || site?.siteMetadata?.siteDescription,
    url: new URL(pathname, site?.siteMetadata?.siteUrl).toString(),
    author: site?.siteMetadata?.author,
    copyright: site?.siteMetadata?.copyright,
    image: site?.siteMetadata?.image,
    twitter: site?.siteMetadata?.social?.twitter,
    github: site?.siteMetadata?.social?.github,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: 'ja',
        prefix:
          'og: http://ogp.me/ns# website: http://ogp.me/ns/website# article: http://ogp.me/ns/article# profile: https://ogp.me/ns/profile#',
      }}
      title={seo.title}
      base={seo.siteUrl}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          httpEquiv: 'Content-Security-Policy',
          content: "default-src 'self'",
        },
        {
          name: 'theme-color',
          content: seo.themeColor,
        },
        {
          name: 'color-scheme',
          content: 'dark',
        },
        {
          name: 'description',
          content: seo.description,
        },
        {
          name: 'google',
          content: 'nositelinkssearchbox',
        },
        {
          name: 'google',
          content: 'notranslate',
        },
        // {
        //   name: 'google-site-verification',
        //   content: '',
        // },
        // {
        //   name: 'yandex-verification',
        //   content: '',
        // },
        // {
        //   name: 'msvalidate.01',
        //   content: '',
        // },
        // {
        //   name: 'alexaVerifyID',
        //   content: '',
        // },
        // {
        //   name: 'p:domain_verify',
        //   content: '',
        // },
        // {
        //   name: 'norton-safeweb-site-verification',
        //   content: '',
        // },
        {
          name: 'generator',
          content: 'Gatsby',
        },
        {
          name: 'rating',
          content: 'General',
        },
        {
          name: 'referrer',
          content: 'no-referrer',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          httpEquiv: 'x-dns-prefetch-control',
          content: 'off',
        },
        {
          httpEquiv: 'Window-Target',
          content: '_value',
        },
        // {
        //   name: 'monetization',
        //   content: '$paymentpointer.example',
        // },
        // {
        //   property: 'fb:app_id',
        //   content: '',
        // },
        {
          property: 'og:url',
          content: seo.url,
        },
        {
          property: 'og:type',
          content: pathname === '/' ? 'website' : 'article',
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:image',
          content: seo.image,
        },
        {
          property: 'og:image:alt',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:site_name',
          content: seo.siteTitle,
        },
        {
          property: 'og:locale',
          content: 'ja_JP',
        },
        // {
        //   property: 'article:published_time',
        //   content: '',
        // },
        // {
        //   property: 'article:modified_time',
        //   content: '',
        // },
        {
          property: 'article:author',
          content: seo.author,
        },
        {
          property: 'article:section',
          content: articleSection,
        },
        // {
        //   property: 'article:tag',
        //   content: articleTags,
        // },
        {
          property: 'profile:first_name',
          content: seo.author?.split(' ')[0],
        },
        {
          property: 'profile:last_name',
          content: seo.author?.split(' ')[1],
        },
        {
          property: 'profile:username',
          content: seo.github,
        },
        {
          property: 'profile:gender',
          content: 'female',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:site',
          content: seo.twitter,
        },
        {
          name: 'twitter:creator',
          content: seo.twitter,
        },
        {
          name: 'twitter:url',
          content: seo.url,
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: seo.description,
        },
        {
          name: 'twitter:image',
          content: seo.image,
        },
        {
          name: 'twitter:image:alt',
          content: pageTitle,
        },
        {
          name: 'twitter:dnt',
          content: 'on',
        },
        {
          name: 'pinterest',
          content: 'nopin',
        },
      ]}
      link={[
        {
          rel: 'author',
          href: 'humans.txt',
        },
      ]}
    />
  );
};

export default SEO;
