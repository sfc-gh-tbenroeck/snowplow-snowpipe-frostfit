import Head from 'next/head'
import Script from 'next/script';
import { useRouter } from 'next/router'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory, fetchInventoryInCategory } from '../utils/inventoryProvider'
import CartLink from '../components/CartLink'


const Home = ({ newArrivals = [] }) => {
  const heroProduct = newArrivals[0];
  const router = useRouter();

  return (
    <>
      <CartLink />
      <div>
        <Head>
          <title>Frost Fit: Elevate Your Performance, Elevate Your Style</title>
          <meta name="description" content="Frost Fit is a luxury sports apparel company that specializes in stylish and functional activewear for men and women. Shop our new arrivals and experience the perfect blend of performance and fashion." />
          <meta name="keywords" content="Frost Fit, sports apparel, luxury activewear, men's activewear, women's activewear, new arrivals, athletic wear, workout clothes, fitness clothing, gym clothes" />
          <meta property="og:title" content="Frost Fit: Luxury Sports Apparel for Men and Women" />
          <meta property="og:description" content="Shop our new arrivals and experience the perfect blend of performance and fashion." />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:url" content="https://www.frostfit.com/" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Frost Fit: Luxury Sports Apparel for Men and Women" />
          <meta name="twitter:description" content="Shop our new arrivals and experience the perfect blend of performance and fashion." />
          <meta name="twitter:image" content="/logo.png" />
        </Head>

        <main className="container mx-auto mt-8">
          {/* Hero Featured Product */}
          <section className="container mx-auto my-8">
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="text-4xl font-semibold mb-4">Featured Product</h2>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex items-center">
                  <a href={`/product/${slugify(heroProduct.name)}`}><img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-full h-100 object-cover border-2 border-gray-300 rounded max-w-md max-h-150 mx-auto"
                  /></a>
                </div>
                <div className="w-full lg:w-1/2 px-4">
                  <h2 className="text-3xl font-semibold mb-4">{heroProduct.name}</h2>
                  <p className="text-xl text-black-500 font-semibold mb-4">${heroProduct.price}</p>
                  <div className="text-gray-600 mb-4">
                    {heroProduct.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded"
                    onClick={() => { router.push(`/product/${slugify(heroProduct.name)}`) }}>View Product</button>
                </div>
              </div>
            </div>
          </section>
          <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {newArrivals.map((product, index) => (
              index !== 0 ? (
                <div className="bg-white shadow p-4 rounded">
                  <a href={`/product/${slugify(product.name)}`}><img src={product.image} alt={product.name} className="w-full h-50 object-cover mb-4  border-2 border-gray-300 rounded " /></a>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              ) : null
            ))}

          </section>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const newArrivals = await fetchInventoryInCategory('new arrivals')

  return {
    props: {
      newArrivals: newArrivals
    }
  }
}

export default Home
