

export default function subscribeMailTemp(data) {
    return (
       ` <div>
            <h1>Subscribe Mail</h1>
            <p>Hi ${data.email},</p>
            <p>Thank you for subscribing to our newsletter. We are excited to keep you updated with the latest news and offers.</p>
        </div>`
    )
}
