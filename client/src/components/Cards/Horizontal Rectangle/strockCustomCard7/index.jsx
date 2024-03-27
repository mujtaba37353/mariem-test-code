import FavoriteIcon from '@mui/icons-material/Favorite'
import { toast } from 'react-toastify'
import { CardMedia, Paper, Box, Stack, Typography, Button } from '@mui/material'
import { imageBaseUrl } from '../../../../constants/baseUrl'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  useAddToSavedProductMutation,
  useGetAllSavedProductsQuery,
} from '../../../../redux/apis/SavedProductApi'

import {
  useAddToCartMutation,
  useGetAllCartsQuery,
} from '../../../../redux/apis/cartApi'
import styles from './card.styles'
import { CardColors7 } from './card.colors'
import { Link } from 'react-router-dom'
import image from '../../../../../public/images/landscapewhite.svg'
const FavoriteIconCard = ({ data, lng, toFavorite, proInFav }) => {
  return (
    <FavoriteIcon
      className="heart"
      sx={{
        color: proInFav ? 'tomato' : 'transparent',
        strokeWidth: proInFav ? 0 : 1,
        stroke: 'ButtonHighlight',
        // position: 'absolute',
        // left: lng==="en"?'unset':'5%',
        // right: lng==="en"?'5%':'unset',
        fontSize: {
          xs: '2.1rem',
          sm: '2.5rem',
          md: '2.5rem',
          lg: '3.4rem',
          xl: '3rem',
        },

        // bottom: '-30px',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation(),
          toFavorite(data._id)
            .unwrap()
            .then((res) => {
              toast.success(res[`success_${lng === 'en' ? 'en' : 'ar'}`])
            })
            .catch((e) =>
              toast.error(e.data[`error_${lng === 'en' ? 'en' : 'ar'}`])
            )
      }}
    />
  )
}

const CardContent = ({
  data,
  lng,
  productInCart,
  addToCart,
  cartData,
  cardLoad,
  props,
}) => {
  console.log(props, 'hasa props')
  const [toFavorite] = useAddToSavedProductMutation()
  const { data: favPros } = useGetAllSavedProductsQuery(undefined)
  const proInFav = favPros?.data.favourite.find(
    (f) => f._id === props?.data._id
  )
  const { data: cartItems, error } = useGetAllCartsQuery(undefined)
  const navigate = useNavigate()
  const { colors } = CardColors7
  const HandleAddToCard = (cartData) => {
    console.log('clicking on cart cartData', data)
    if (data?.paymentType === 'both' || data?.qualities?.length) {
      navigate(`/products/${data?._id}/${data?.title_en.replace(/\s/g, '-')}`)
    } else {
      addToCart({
        ...cartData,
        paymentType: data?.paymentType,
      })
        .unwrap()
        .then((res) =>
          toast.success(res[`success_${lng === 'en' ? 'en' : 'ar'}`])
        )
        .catch((e) =>
          toast.error(e.data[`error_${lng === 'en' ? 'en' : 'ar'}`])
        )
    }
  }

  return (
    <Stack className={'card-co'}>
      <>
        <Box
          sx={{
            display: 'block',
            justifyContent: 'space-around',
            alignItems: lng === 'en' ? 'flex-start' : 'flex-end',
            width: '100%',
            // flexDirection: lng === 'en' ? 'row' : 'row-reverse',
            direction: lng === 'ar' ? 'rtl' : 'ltr',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              ' flex-direction': 'column',
              widht: '100%',
              display: 'block',

              // alignItems: lng === 'en' ? 'flex-start' : 'flex-end',
            }}
            className="conten"
          >
            {/* <Typography
              id={'title'}
              sx={{
                color: '#fff',

                fontSize: {
                  xs: '15px !important',
                  sm: '25px !important',
                  md: '20px !important ',
                  lg: '25px !important ',
                  xl: '30px !important ',
                },
                widht: '100%',
                display: 'block',
              }}
            >
              {lng === 'en'
                ? data[`title_${lng === 'en' ? 'en' : 'ar'}`].slice(0, 50)
                : data.title_ar.slice(0, 50)}
              {lng === 'en' ? (
                data?.title_en?.length > 40 ? (
                  <>..</>
                ) : null
              ) : data?.title_ar?.length > 40 ? (
                <>..</>
              ) : null}
            </Typography> */}
            {/* <Typography
              id={'description'}
              sx={{
                color: '#fff',
                ' text-shadow': '2px 0px 5px black',
                fontWeight: '400',

                fontSize: {
                  xs: '12px',
                  sm: '12px',
                  md: '12px',
                  lg: '15px',
                  xl: '19px',
                },
                '& > p': {
                  marginY: 'unset',
                },
                '&  * ': {
                  display: 'flex',
                  textAlign: lng === 'ar' ? 'right' : 'left',
                },
                '& > * ': {
                  textAlign: lng === 'ar' ? 'right' : 'left',
                  fontSize: {
                    xs: '12px',
                    sm: '14px',
                    md: '13px',
                    lg: '16px',
                    xl: '20px',
                  },
                  fontWeight: '400',
                  'text-shadow': '2px 0px 5px black',
                },
                width: '100%',
                display: 'block',
              }}
              dangerouslySetInnerHTML={{
                __html: `${data[
                  `description_${lng === 'en' ? 'en' : 'ar'}`
                ].slice(0, 50)} `,
              }}
            /> */}
            {/* {lng === 'en' ? (
                data?.description_en?.length > 40 ? (
                  <>..</>
                ) : null
              ) : data?.description_ar?.length > 40 ? (
                <>..</>
              ) : null} */}
          </Box>
        </Box>
      </>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-around',
          marginTop: '15px',
        }}
      >
        <Button
          disabled={cardLoad}
          variant={colors.borderColor ? 'outlined' : 'contained'}
          className="cate_button"
          sx={{
            bgcolor: `${colors.buttonBackgroundColor} !important`,
            color: `#BFBFBF !important`,
            mb: '2px',
            'border-radius': '8px',
            fontWeight: '700',
            border: '0px !Important',
            width: {
              xs: '200px !important',
              sm: '180px !important',
              md: '180px !important',
              lg: '200px !important',
            },
            height: { xs: '45px', sm: '40px', md: '45px', lg: '50px' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            HandleAddToCard(cartData)
          }}
        >
          {lng === 'en'
            ? cardLoad
              ? 'lorem ipsum...'
              : 'lorem ipsum'
            : cardLoad
            ? 'اضف الي العربة...'
            : 'أضف إلى العربة'}
        </Button>

        <FavoriteIconCard
          proInFav={proInFav}
          toFavorite={toFavorite}
          data={props?.data}
          lng={lng}
        />
      </Stack>
    </Stack>
  )
}

// ⭐ Parent
const Card8 = (props) => {
  console.log(props, 'cartprops')
  const [, { language: lng }] = useTranslation()
  const nav = useNavigate()
  const [toFavorite] = useAddToSavedProductMutation()
  const { data: favPros } = useGetAllSavedProductsQuery(undefined)
  const proInFav = favPros?.data.favourite.find(
    (f) => f._id === props?.data._id
  )
  const [addToCart, { isLoading: cardLoad }] = useAddToCartMutation()
  const { data: cartItems, error } = useGetAllCartsQuery(undefined)

  const cartData = {
    quantity: 1,
    properties: [],
    id: props?.data._id,
  }

  const productInCart =
    !error &&
    cartItems?.data[
      props?.data?.paymentType === 'cash' ? 'cashItems' : 'onlineItems'
    ]?.items?.find(
      (eachProduct) => eachProduct?.product?._id === props?.data?._id
    )
  console.log('productInCart', props?.item?.title_en, productInCart)
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: '#BFBFBF',
        paddingLeft: '15px',
        paddingRight: '15px',
      }}
      id="cardStyle"
    >
      {props?.data?.images && props?.data?.images[0] && (
        <Link to={'/'}>
          <CardMedia component={'img'} src={image} sx={styles.cardImg} />
        </Link>
      )}
      <CardContent
        data={props?.data}
        productInCart={productInCart}
        addToCart={addToCart}
        cartData={cartData}
        lng={lng}
        cardLoad={cardLoad}
        props={props}
      />
    </Paper>
  )
}

export default Card8
