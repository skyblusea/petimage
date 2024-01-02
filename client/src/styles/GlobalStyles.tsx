import { css } from "@emotion/react"


// 전역 스타일 설정
const reset = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ol, ul {
    list-style: none;
  }


  a {
      text-decoration: none;
      color: inherit;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }

  :root {
    /* color */
    --primary: #ff5658;
    --white: #fff;
    --black: #333;
    --sub-red: #ED1C00;
    --btn-gray: #999;
    --stroke-gray: #eee;

    /* font */
    --h1: 3.125rem;
    --h2: 2.5rem;
    --sub_title: 1.875rem;
    --body1: 1.5rem;
    --body2: 1.125rem;
    --body3: 1rem;
    --font-lg: 1.25rem;
    --font-md: 1.125rem;
    --font-sm: 1rem;

    /* border-radius */
    --border-radius-lg: 20px;
    --border-radius-sm: 10px;

    /* box shadow */
    --main_banner: 2px 2px 22px 0px rgba(0, 0, 0, 0.15);
    --card: 2px 4px 15px 2px rgba(0, 0, 0, 0.10);

    /* swiper(banner) theme */
    --swiper-theme-color: #fff;

    /* nav-padding */
    --pd-nav-lg: 0 8rem;
    --pd-nav-md: 0 3rem;
    --pd-nav-sm: 0 1rem;

    /* padding */
    --pd-lg: 24px;
    --pd-md: 16px;
    --pd-sm: 8px;
    --pd-xs: 4px;
    
    /* gap */
    --gap-lg: 24px;
    --gap-md: 16px;
    --gap-sm: 8px;
    @media screen and (max-width: 900px){
      --gap-lg: 16px;
      --gap-md: 8px;
      --gap-sm: 4px;
    }

    --nav-h: 92px;
    --footer-h: 30px;
    @media screen and (max-width: 900px){
      --nav-h: 60px;
    }
  }


`

export default reset;