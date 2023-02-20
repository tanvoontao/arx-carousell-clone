import Head from 'next/head';

export default function Metatags({
    title = 'ARx Official Website',
    description = 'ARx Media - cutting-edge AR/VR, web/mobile apps, IoT, and business solutions',
    image = 'https://arxmedia.co/wp-content/uploads/2021/05/arx-logo-2-10.png',
}) {
    return (
        <Head>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

        </Head>
    );
}



