import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script type="application/json" id="DATA">
          {JSON.stringify({
            lotNo: "AT013971",
            model: "IPH12 PM 128GB",
            count: 500,
            grade: "A+",
            printedBy: "Salim B.",
            createdAt: "1/23/2023 2:55 PM",
            expiration: "01/23/2023 4:24 PM",
            late: false,
            dueSoon: false,
            priority: 0,
            createdBy: "Salim A.",
            assignments: [{
              name: "Shipping",
              count: 200,
            }, {
              name: "Testing",
              count: 300
            }],
            tasks: [{
              name: "Face ID Unlock",
              category: "TESTING",
              completed: false
            }, {
              name: "Polish",
              category: "GRADING",
              completed: true
            }, {
              name: "Wifi, Touch, and Charge Testing",
              category: "TESTING",
              completed: false
            }]
          })}
        </script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
