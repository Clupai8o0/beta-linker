import { Skeleton } from "../ui/skeleton"

const SkeletonCards = () => {
  return [1, 2, 3, 4, 5, 6].map((_) => (
		<div className="flex flex-col gap-4">
			<Skeleton className="w-full h-48" />
			<Skeleton className="w-3/4 h-6" />
			<Skeleton className="w-2/3 h-6" />
		</div>
	));
}

export default SkeletonCards