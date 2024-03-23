

const DelStatus = ({delStatus}) => {
  return (
    <div className={`status-del ${delStatus && 'active'}`}>
        Item has been Deleted!
    </div>
  )
}

export default DelStatus