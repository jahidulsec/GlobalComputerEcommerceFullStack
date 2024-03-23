
const OrderStatus = ({status}) => {
  return (
    <>
        {
            !status ?
                <span className="order-status">Pending</span>
                    :
                <span className="order-status delivered">Delivered</span>
        }
    </>
  )
}

export default OrderStatus