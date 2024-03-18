/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/app",
				destination: "/",
				permanent: true,
			},
			{
				source: "/login",
				destination: "/auth",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "gsehnnsfstvedbnvoqyf.supabase.co",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
