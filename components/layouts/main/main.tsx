import { Box } from '@chakra-ui/layout'
import Head from 'next/head'
import Navbar from './navbar'

interface props {
  children: React.ReactNode
}

export default function Main({ children }: props) {
  const applicationIdJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.reddit.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target:
        'https://www.reddit.com/search?q={search_term_string}\u0026referrer=sitelinks_searchbox',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <Head>
        <title>Reddit C</title>
        <meta property="github:site" content="@expitc" />
        <meta name="author" content="expitc, indratc18@gmail.com" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://www.redditstatic.com/desktop2x/img/favicon/manifest.json?v=2"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="https://www.redditstatic.com/desktop2x/img/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#FFFFFF" data-reactroot="" />
        <meta name="jsapi" />
        <meta
          name="description"
          content="Reddit C is a network of communities where people can dive into their interests, hobbies and passions. There&#x27;s a community for whatever you&#x27;re interested in on Reddit C @expitc."
        />
        <link rel="canonical" href="https://www.reddit.com/" />
        <link rel="next" href="https://www.reddit.com/r/expitc" />
        <meta property="og:ttl" content="600" />
        <meta property="og:site_name" content="redditC" />
        <meta property="twitter:site" content="@reddit" />
        <meta property="twitter:card" content="summary" />
        <meta property="og:title" content="redditC" />
        <meta property="twitter:title" content="redditC" />
        <meta
          property="twitter:image"
          content="https://www.redditstatic.com/icon.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reddit.com/" />
        <meta
          property="og:image"
          content="https://www.redditstatic.com/icon.png"
        />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(applicationIdJson)
          }}
        />
        <link rel="alternate" hrefLang="en" href="https://www.reddit.com/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.reddit.com/"
        />
        <link rel="alternate" hrefLang="de" href="https://www.reddit.com/de/" />
        <link rel="alternate" hrefLang="es" href="https://www.reddit.com/es/" />
        <link rel="alternate" hrefLang="fr" href="https://www.reddit.com/fr/" />
        <link rel="alternate" hrefLang="it" href="https://www.reddit.com/it/" />
        <link rel="alternate" hrefLang="pt" href="https://www.reddit.com/pt/" />
      </Head>

      <Box as="main">
        <Navbar />

        {children}

        {/* <Footer /> */}
      </Box>
    </>
  )
}
