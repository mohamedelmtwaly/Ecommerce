

export default function SectionTitle({text}) {
  return (
    <div className="border-b-2 border-gray-200 pb-5">
      <h2 className="text-3xl font-semibold text-gray-900 capitalize">
        {text}
      </h2>
    </div>
  )
}