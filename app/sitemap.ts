export default  function sitemap() {
    const baseUrl = 'https://hrq.vercel.app';
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/price`,
            lastModified: new Date(),
        },
    ]
}