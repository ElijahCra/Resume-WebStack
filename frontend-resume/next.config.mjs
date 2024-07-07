import {withContentlayer} from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output : "standalone",
    reactStrictMode: true,
};

export default withContentlayer(nextConfig);
