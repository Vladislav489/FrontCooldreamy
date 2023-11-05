export const container = {
    hidden: { opacity: 1},
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      }
    }
  }

// export const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   }

export const item = {
  hidden: { scale: 0 },
  visible: {
      scale: 1,
      transition: {
        type: 'spring',
      }
  },
}

