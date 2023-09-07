import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import Script from 'next/script'


function Ecommerce({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-97CRPYM8B4"
        async
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-97CRPYM8B4');
          `
        }}
      />

      {/* -- Snowplow start plowing -- */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
          p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q = p[i].q || []).push(arguments)
          };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
        n.src=w;g.parentNode.insertBefore(n,g)}}(window, document, "script", "/js/sp.js", "snowplow"));
          var snowplowUrl = window.location.protocol + "//" + window.location.host;

          window.snowplow('newTracker', 'spmicro', snowplowUrl, { // Initialize a tracker
            encodeBase64: false,
          appId: 'frostfit',
          platform: "web",
          discoverRootDomain: true,
          eventMethod: 'beacon'
        });

          // activity tracking
          window.snowplow('enableActivityTracking', {
            minimumVisitLength: 20,
          heartbeatDelay: 20
        });

          // form tracking
          var options = {
            forms: {
            denylist: []
            },
          fields: {
            denylist: ['user_password']
            }
        };

          window.snowplow('enableFormTracking', {options: options });

          window.snowplow('trackPageView');
          `
        }}
      />
      {/* -- Snowplow stops plowing -- */}
      <Component {...pageProps} />
    </Layout>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce
