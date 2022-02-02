function GlobalStyle() {
  return (
      <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }

    @keyframes animate {
      from {
        transform: scale(0.5) rotate(0deg);
        opacity: 0.0;
      }

      to {
        transform: scale(0.9) rotate(359deg);
        opacity: 0.9;
      }
    }

    .transform {
      animation: animate 1s infinite linear;

    }
    /* ./App fit Height */ 
  `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  console.log('Roda em todas as páginas!');
  return (
      <>
          <GlobalStyle />
          <Component {...pageProps} />
      </>
  );
}
