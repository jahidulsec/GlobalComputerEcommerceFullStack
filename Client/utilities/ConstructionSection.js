import Image from "next/image"

async function ConstructionSection() {
  return (
    <div className="contruction-section">
        <Image src="/maintanence.svg" alt="Under Construction" width={400} height={400} />
    </div>
  )
}

export default ConstructionSection