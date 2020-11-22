import bannerJacket from 'assets/images/bannerJacket.jpg'
import bannerNike from 'assets/images/bannerNike.jpg'
import bannerShoping from 'assets/images/bannerShoping.jpg'
import accessoriesCategory from 'assets/images/accessoriesCategory.jpg'
import jacketsCategory from 'assets/images/jacketsCategory.jpg'
import shoesCategory from 'assets/images/shoesCategory.jpg'

const initialState = {
  slides: [
    {
      id: '1',
      image: bannerJacket,
      title: 'We already have new winter sales 50% off',
      subTitle: 'Choose your favorite models at half price',
      btnContent: 'Buy now',
    },
    {
      id: '2',
      image: bannerNike,
      title: 'Discover your style with us',
      subTitle: 'New collection has already dropped',
      btnContent: 'Check collection',
    },
    {
      id: '3',
      image: bannerShoping,
      title: 'Improve your look with our wear',
      subTitle: 'Limited clothes available only in our store',
      btnContent: 'Shop now',
    },
  ],
  categories: [
    {
      category: 'jackets',
      image: jacketsCategory,
    },
    {
      category: 'shoes',
      image: shoesCategory,
    },
    {
      category: 'accessories',
      image: accessoriesCategory,
    },
  ],
  wishList: [],
  shopingBasket: [],
}

export default initialState
