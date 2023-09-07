import Head from 'next/head'
import Script from 'next/script';
import { titleIfy , slugify } from '../utils/helpers'
import { DisplayMedium } from '../components'
import CartLink from '../components/CartLink'
import { fetchInventory } from '../utils/inventoryProvider'

function Categories ({ categories = [] }) {
  return (
    <>
      <div className="w-full">
        <CartLink />
        <Head>
          <title>Frost Fit: All Categories</title>
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

        <div className="
          pt-4 sm:pt-10 pb-8
        ">
          <h1 className="text-5xl font-light">All categories</h1>
        </div>
        <div className="flex flex-col items-center">

          {/* <div className="my-4 lg:my-8 flex flex-col lg:flex-row justify-between"> */}
          <div className="grid gap-4
          lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {
            categories.map((category, index) => (
              <DisplayMedium
                key={index}
                imageSrc={category.image}
                subtitle={`${category.itemCount} items`}
                title={titleIfy(category.name)}
                link={`/category/${slugify(category.name)}`}
              />
            ))
          }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  const inventoryCategories = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        }
        acc.push(item)
      }
    })
    return acc
  }, [])

  return {
    props: {
      categories: inventoryCategories
    }
  }
}

export default Categories
