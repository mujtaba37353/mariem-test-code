import { Box, CardMedia, Typography } from '@mui/material'
import { useGetSectionByTypeQuery } from '../../redux/apis/sectionsApi'
import { imageBaseUrl } from '../../constants/baseUrl'
import Image from './un.png'
const Banner = (props) => {
  const { data } = useGetSectionByTypeQuery('banner')

  const banner = data?.data.filter((b) => b.alignment === 'horizontal')[0]
  const bannerVertical = data?.data.filter((b) => b.alignment === 'vertical')[0]

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      {props.bannerHorizontal && (
        <Box
          width={props.width ? '50%' : '100%'}
          mx={props.width ? 'auto' : '0'}
          height={{ md: '25vh', sm: '20vh', xs: '15vh', lg: '30vh' }}
          my={5}
          sx={
            {
              // background: `url("${imageBaseUrl + banner?.image}") center center`,
              // backgroundSize: '100% ',
              // backgroundRepeat: 'no-repeat',
            }
          }
        ></Box>
      )}
      {props.bannerVertical && (
        <Box
          width={props.collection ? '60%' : '30%'}
          height={'80%'}
          sx={{ writingMode: 'vertical-lr', border: ' 2px solid #BFBFBF' }}
        >
          {/* <CardMedia
            component="img"
            height="100%"
            width="100%"
            sx={{writingMode: "vertical-lr"}}
            // image={imageBaseUrl + bannerVertical?.image}
            // image={Image}
          /> */}
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              lineHeight: '100px',
              fontWeight: '400',
              color: '#535353',
            }}
          >
            ADS AREA
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Banner
