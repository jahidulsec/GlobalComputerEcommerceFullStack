const Loading = ({loading}) => {
  return (
    
    <>
      {
        loading &&
          <span className='loading'>Loading</span>
      }
    </>
    
  )
}

export default Loading