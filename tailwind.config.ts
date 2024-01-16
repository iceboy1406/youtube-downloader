import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                cardDark: '#161629',
                primary: '#6016FC',
                dark: '#0B0B22',
                error: '#FC165B',
                badge: '#16FCD2',
                muted: '#ffffff99',
                highlight: '#221048',
                light: '#ffffff0d',
                buttonLight: '#ffffff1a',
                borderLight: '#ffffff1a',
                primaryLight: '#6016FC1a',
            },
        },
    },
    plugins: [],
}
export default config
