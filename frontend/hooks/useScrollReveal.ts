// 'use client'

// import { useEffect } from 'react'

// export default function useScrollReveal() {
//   useEffect(() => {
//     const elements = document.querySelectorAll('.scroll-reveal')

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('show')
//           }
//         })
//       },
//       { threshold: 0.3 }
//     )

//     elements.forEach((el) => observer.observe(el))

//     return () => observer.disconnect()
//   }, [])
// }


'use client'

import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )

    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal:not(.show)')
      elements.forEach((el) => observer.observe(el))
    }

    observeElements()

    // watch DOM changes (Next.js navigation)
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }

  }, [])
}