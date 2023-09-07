import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script';
import Button from '../../components/Button'
import Image from '../../components/Image'
import QuantityPicker from '../../components/QuantityPicker'
import { fetchInventory } from '../../utils/inventoryProvider'
import { titleIfy, slugify } from '../../utils/helpers'
import CartLink from '../../components/CartLink'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'

const ItemView = (props) => {
  const router = useRouter();
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { product } = props
  const { price, image, name, description } = product
  const { context: { addToCart } } = props

  function addItemToCart(product) {
    product["quantity"] = numberOfitems
    addToCart(product)
    router.push(`/cart`)
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <CartLink />
      <Head>
        <title>Frost Fit: {titleIfy(product.name)}</title>
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

      <section className="mb-8">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <img src={image} alt={name} className="w-full h-auto object-cover border-2 border-gray-300 rounded" />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-3xl font-semibold mb-4">{name}</h2>
            <p className="text-xl text-red-500 font-semibold mb-4">${price}</p>
            <div className="text-gray-600 mb-4">
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded" onClick={() => addItemToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

    </>
  )
}

export async function getStaticPaths() {
  const inventory = await fetchInventory()
  const paths = inventory.map(item => {
    return { params: { name: slugify(item.name) } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const name = params.name.replace(/-/g, " ")
  const inventory = await fetchInventory()
  const product = inventory.find(item => slugify(item.name) === slugify(name))

  return {
    props: {
      product,
    }
  }
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <ItemView {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext
