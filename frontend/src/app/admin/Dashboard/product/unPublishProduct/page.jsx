import UnPublishProduct from '@/pages/Admin-Products/unPublishProduct/unPublishProduct'
import React from 'react'

export const metadata = {
  title: "Unpublish Product",
  layout: "admin",
};

function page() {
  return (
    <div>
      <UnPublishProduct />
    </div>
  )
}

export default page
