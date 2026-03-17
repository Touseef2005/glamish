export function orderTemp(data) {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    postalCode,
    total,
    paymentMethod,
    productInfo = []
  } = data;

  const paymentMethods = {
    cod: "Cash on Delivery",
    easypaisa: "EasyPaisa",
    card: "Credit/Debit Card"
  };


  const productRows = productInfo.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.price * product.quantity}</td>
        </tr>
    `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        .content {
          padding: 20px;
        }
        .details {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
           table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
        .highlight {
          font-weight: bold;
          color: #2c3e50;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Order Confirmation</h2>
      </div>
      
      <div class="content">
        <p>Dear <span class="highlight">${firstName} ${lastName}</span>,</p>
        <p>Thank you for your order! Here are your order details:</p>
        
        <div class="details">
          <h3>Customer Information</h3>
          <p><span class="highlight">Name:</span> ${firstName} ${lastName}</p>
          <p><span class="highlight">Email:</span> ${email}</p>
          <p><span class="highlight">Phone:</span> ${phone}</p>
          
          <h3>Shipping Address</h3>
          <p>${address.replace(/\n/g, '<br>')}</p>
          <p>${city}, ${postalCode}</p>

          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          
          <h3>Order Summary</h3>
          <p><span class="highlight">Total Amount:</span> ${total}</p>
          <p><span class="highlight">Payment Method:</span> ${paymentMethods[paymentMethod] || paymentMethod}</p>
        </div>
        
        <p>We'll process your order shortly. Please contact us if you have any questions.</p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

}