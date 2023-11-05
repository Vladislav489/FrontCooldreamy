const goToTop = () => {
  if(window?.innerWidth <= 768) {
    const main = document.documentElement.querySelector('main')
    main?.scrollTo(0,0)
  } else {
    document.documentElement.scrollTo(0,0)
  }
  

}

export default goToTop;