import { Box, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import about2 from '../../../assets/png/about2.png'
import about3 from '../../../assets/png/about3.png'
import about4 from '../../../assets/png/about4.png'
import { useGetSectionByTypeQuery } from '../../../redux/apis/sectionsApi'
import { colors } from './about2.style'
import { imageBaseUrl } from '../../../constants/baseUrl'
import landscapewhite from '../../../../public/images/landscapewhite.svg'
const About2 = () => {
  const imgs = [about2, about3, about4]
  const [_, { language: lang }] = useTranslation()
  const { data, isLoading, error } = useGetSectionByTypeQuery('aboutus')
  const descLength_en = data && !error && data.data[0].description_en.length
  const descLength_ar = data && !error && data.data[0].description_ar.length
  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        mx: { xs: 1, lg: 10 },
        height: '100vh',
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row-reverse' }}
        // justifyContent={'space-between'}
        spacing={2}
        sx={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}
      >
        <Stack
          direction={'row'}
          flex={1}
          spacing={1}
          justifyContent={{ xs: 'center', lg: 'flex-end' }}
          sx={{ height: '80vh' }}
        >
          <Box sx={{ height: '80vh', flex: 1 }}>
            {[imgs[0], imgs[1]].map((img, index) => (
              <CardMedia
                key={index}
                component={'img'}
                src={landscapewhite}
                sx={{
                  display: 'block',
                  width: '95%',
                  height: { sm: '350px', xs: '300px', md: '360px' },
                  mb: 2.5,
                  bgcolor: '#BFBFBF',
                  objectFit: 'contain',
                  padding: '15px',
                }}
              />
            ))}
          </Box>
          <Box sx={{ alignSelf: 'center', flex: 1 }}>
            {[`${imageBaseUrl}${data?.data[0].image}`, imgs[2]].map(
              (img, index) => (
                <CardMedia
                  key={index}
                  component={'img'}
                  src={landscapewhite}
                  sx={{
                    display: 'block',
                    width: '95%',
                    height: { sm: '350px', xs: '300px', md: '400px' },
                    mb: 2.5,
                    bgcolor: '#BFBFBF',
                    objectFit: 'contain',
                    padding: '15px',
                  }}
                />
              )
            )}
          </Box>
        </Stack>
        <Box
          flex={1}
          sx={{
            lineHeight: 2,
            fontSize: { md: 18, lg: 20, xl: 25 },
            color:"#BFBFBF",
            fontSize:"30px"
          }}
          dangerouslySetInnerHTML={{
            __html:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta provident, quibusdam illum excepturi dicta molestias dolore laborum nulla animi alias sed at doloribus rem itaque, culpa ipsam, perspiciatis optio aut? ',
          }}
        />
      </Stack>
  
      {/* <Box
        sx={{
          lineHeight: 2,
          fontSize: { md: 18, lg: 20, xl: 25 },
          color: colors.descColor,
          textAlign: lang == 'en' ? 'left' : 'right',
          mt: 8,
        }}
        dangerouslySetInnerHTML={{
          __html:
            lang === 'en'
              ? data?.data[0].description_en.slice(
                  descLength_en / 2,
                  descLength_en
                )
              : data?.data[0].description_ar.slice(
                  descLength_ar / 2,
                  descLength_ar
                ),
        }}
      /> */}
    </Box>
  )
}

export default About2
