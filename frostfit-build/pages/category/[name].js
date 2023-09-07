import Head from 'next/head'
import Script from 'next/script';
import ListItem from '../../components/ListItem'
import { titleIfy, slugify } from '../../utils/helpers'
import fetchCategories from '../../utils/categoryProvider'
import inventoryForCategory from '../../utils/inventoryForCategory'
import CartLink from '../../components/CartLink'

const Category = (props) => {
  const { inventory, title } = props
  return (
    <>
      <CartLink />
      <Head>
        <title>Frost Fit: {titleIfy(title)}</title>
        <meta name="description" content="Frost Fit is a luxury sports apparel company that specializes in stylish and functional activewear for men and women. Shop our new arrivals and experience the perfect blend of performance and fashion." />
        <meta name="keywords" content="Frost Fit, sports apparel, luxury activewear, men's activewear, women's activewear, new arrivals, athletic wear, workout clothes, fitness clothing, gym clothes" />
        <meta property="og:title" content="Frost Fit: Luxury Sports Apparel for Men and Women" />
        <meta property="og:description" content="Shop our new arrivals and experience the perfect blend of performance and fashion." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.frostfit.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frost Fit: Luxury Sports Apparel for Men and Women" />
        <meta name="twitter:description" content="Shop our new arrivals and experience the perfect blend of performance and fashion." />
        <meta name="twitter:image" content="/logo.png" />ƒ
      </Head>

      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {inventory.map((product, index) => (
              <div className="bg-white shadow p-4 rounded">
                <a href={`/product/${slugify(product.name)}`}><img src={product.image} alt={product.name} className="w-full h-50 object-cover mb-4" /></a>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
            ))}

          </section>

        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const categories = await fetchCategories()
  const paths = categories.map(category => {
    return { params: { name: slugify(category) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const category = params.name.replace(/-/g, " ")
  const inventory = await inventoryForCategory(category)
  return {
    props: {
      inventory,
      title: category
    }
  }
}

export default Category
