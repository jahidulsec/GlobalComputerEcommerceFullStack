import PCBuildCatPage from "@/components/pc build page/PCBuildCatPage"
import { PCBuildCatSSR } from "@/components/pc build page/PCBuildCatSSR"

const page = async(props) => {
  const params = await props.params
  const searchParams = await props.searchParams
  return (
 
    <PCBuildCatPage params={params} >
        <PCBuildCatSSR params={params} searchParams={searchParams} />
    </PCBuildCatPage>
            
  )
}

export default page